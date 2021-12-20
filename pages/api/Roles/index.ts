import { User } from "@firebase/auth";
import { Request, Response } from "express";
import { firebaseAdmin } from "../../../src/firebase/admin";
export default async (req: Request, res: Response) => {
  const { method } = req;
  const body = JSON.parse(req.body);
  const { users, role, remove } = body;
  try {
    switch (method) {
      case "POST":
        // Verify the ID token and decode its payload.
        var bar = new Promise(async (resolve) => {
          await users.forEach(
            async (user: User, idx: number, array: User[]) => {
              const { customClaims: oldCustomClaims } = await firebaseAdmin
                .auth()
                .getUser(user.uid);

              await firebaseAdmin.auth().setCustomUserClaims(user.uid, {
                ...oldCustomClaims,
                [role]: !remove,
              });

              if (idx === array.length - 1) resolve(null);
            }
          );
        });
        await bar.then(() =>
          res.status(200).send(
            JSON.stringify({
              status: "success",
            })
          )
        );
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};
