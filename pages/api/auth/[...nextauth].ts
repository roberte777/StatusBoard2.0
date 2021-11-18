const ldap = require("ldapjs");
import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";
import CrednetialsProvider from "next-auth/providers/credentials";
import xml2js from "xml2js";
export default NextAuth({
  providers: [
    CrednetialsProvider({
      name: "AMERICAS",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any) {
        try {
          const client = ldap.createClient({
            url: process.env.LDAP_URI
          });
          client.on("error", () => {
            client.destroy();
          });
          return new Promise((resolve, reject) => {
            client.bind(
              `${process.env.LDAP_URI!.split("://")[1].split(".")[0]}\\${
                credentials.username
              }`,
              credentials.password,
              (error: { errno: number }) => {
                if (error) {
                  if (error.errno == -3008) {
                    reject(new Error("Connection Error"));
                  } else {
                    resolve(null);
                  }
                } else {
                  if (credentials.password == "") {
                    resolve(null);
                  } else {
                    client.search(
                      `DC=${process.env
                        .LDAP_URI!.split("://")[1]
                        .split(".")
                        .join(",DC=")}`,
                      {
                        filter: `(sAMAccountName=${credentials.username})`,
                        scope: "sub"
                      },
                      (
                        err: any,
                        res: {
                          on: (
                            arg0: string,
                            arg1: (entry: any) => Promise<void>
                          ) => void;
                        }
                      ) => {
                        if (err) reject(new Error("User Search Error"));
                        res.on(
                          "searchEntry",
                          async (entry: {
                            object: {
                              dcxObjectOwner: any;
                              mail: any;
                              name: any;
                              department: any;
                            };
                          }) => {
                            const manager = (
                              await xml2js.parseStringPromise(
                                entry.object.dcxObjectOwner
                              )
                            )?.ownership?.role
                              .map((e: { [x: string]: any }) => ({
                                ...e["$"]
                              }))
                              .find(
                                (e: { type: string }) => e.type === "SUPERVISOR"
                              )?.sAMAccountName;
                            client.search(
                              `DC=${process.env
                                .LDAP_URI!.split("://")[1]
                                .split(".")
                                .join(",DC=")}`,
                              {
                                filter: `(sAMAccountName=${manager})`,
                                scope: "sub"
                              },
                              (
                                err: any,
                                res: {
                                  on: (
                                    arg0: string,
                                    arg1: (manager: any) => void
                                  ) => void;
                                }
                              ) => {
                                res.on(
                                  "searchEntry",
                                  (manager: {
                                    object: {
                                      name: any;
                                      sAMAccountName: any;
                                    };
                                  }) => {
                                    if (err)
                                      reject(new Error("Manager Search Error"));
                                    resolve({
                                      username:
                                        credentials.username.toUpperCase(),
                                      sub: credentials.username,
                                      domain: "AMERICAS",
                                      email: entry.object.mail,
                                      name: entry.object.name,
                                      department: entry.object.department,
                                      manager: manager.object.name,
                                      managerUsername:
                                        manager.object.sAMAccountName
                                    });
                                    client.destroy();
                                  }
                                );
                              }
                            );
                          }
                        );
                      }
                    );
                  }
                }
              }
            );
          });
        } catch (err) {
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt(token: JWT, user?: User) {
      if (user) {
        token.user = user;
      }
      // uncomment for role based authentication
      //   token.roles = await getRoles(token.user);
      return token;
    },
    async session(token: any) {
      return token;
    }
  },
  secret: process.env.JWT_SECRET,
  jwt: {
    secret: process.env.JWT_SECRET,
    signingKey: process.env.JWT_SIGNING_KEY,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    encryption: true // Very important to encrypt the JWT, otherwise you're leaking username+password into the browser
  }
});

//uncomment for role based authentication
// async function getRoles(user: { username: any }): Promise<
//   {
//     userid: string;
//     roleid: number;
//   }[]
// > {
//   const resp = await (
//     await fetch(`${process.env.SITE}/api/v1/Users/${user.username}/Roles`)
//   ).json();
//   return resp;
// }
