import { Request, Response } from "express";
import { firebaseAdmin } from "@/firebase/admin";
export default async (req: Request, res: Response) => {
  const { method } = req;
  try {
    switch (method) {
      case "GET":
        let users: Object[] = [];
        const listAllUsers = async (nextPageToken?: string | undefined) => {
          // List batch of users, 1000 at a time.
          await firebaseAdmin
            .auth()
            .listUsers(1000, nextPageToken)
            .then(async (listUsersResult) => {
              listUsersResult.users.forEach((userRecord) => {
                // console.log("user", userRecord.toJSON());
                users.push(userRecord.toJSON());
              });
              if (listUsersResult.pageToken) {
                // List next batch of users.
                await listAllUsers(listUsersResult.pageToken);
              } else {
                res.status(200).json(users);
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
      default:
        res.status(200).send("ok");
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};
