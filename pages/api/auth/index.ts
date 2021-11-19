import { Request, Response } from "express";
import { firebaseAdmin } from "../../../src/firebase/admin";
export default async (req: Request, res: Response) => {
  const { method, body } = req;
  const user = JSON.parse(body);
  try {
    switch (method) {
      case "POST":
        firebaseAdmin
          .auth()
          .createUser({
            email: user.email,
            emailVerified: false,
            password: user.password,
            displayName: `${user.name}`,
            photoURL: "http://www.example.com/12345678/photo.png",
            disabled: false
          })
          .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log("Successfully created new user:", userRecord.uid);
          })
          .catch((error) => {
            console.log("Error creating new user:", error);
          });

        res.status(200).send("OK");
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};
