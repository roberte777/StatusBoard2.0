import { Request, Response } from "express";
import { firebaseAdmin } from "@/firebase/admin";
import { User } from "@firebase/auth";
import { FirebaseError } from "firebase-admin";
export default async (req: Request, res: Response) => {
  const { method, body } = req;

  try {
    switch (method) {
      case "GET":
        let returnedUsers: Object[] = [];
        const listAllUsers = async (nextPageToken?: string | undefined) => {
          // List batch of users, 1000 at a time.
          await firebaseAdmin
            .auth()
            .listUsers(1000, nextPageToken)
            .then(async (listUsersResult) => {
              listUsersResult.users.forEach((userRecord) => {
                returnedUsers.push(userRecord.toJSON());
              });
              if (listUsersResult.pageToken) {
                // List next batch of users.
                await listAllUsers(listUsersResult.pageToken);
              } else {
                res.status(200).json(returnedUsers);
              }
            })
            .catch((error) => {
              console.log("Error listing users:", error);
              res.status(400).send("bad");
            });
        };
        // Start listing users from the beginning, 1000 at a time.
        await listAllUsers();
        // res.status(200).send("ok");
        break;
      case "DELETE":
        const { users } = JSON.parse(body);

        await new Promise((resolve) => {
          users.forEach(async (user: User, idx: number) => {
            await firebaseAdmin
              .auth()
              .deleteUser(user.uid)
              .catch((error: FirebaseError) =>
                res.status(400).send({ error: error })
              );
            if (idx === users.length - 1) {
              resolve(null);
            }
          });
        }).then(() =>
          res.status(200).send({ success: "User(s) deleted successfully" })
        );
        break;
      default:
        res.status(200).send("ok");
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};
