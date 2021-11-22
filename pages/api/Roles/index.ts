import { Request, Response } from "express";
import { firebaseAdmin } from "../../../src/firebase/admin";
export default async (req: Request, res: Response) => {
  const { method } = req;
  const body = JSON.parse(req.body);
  const { uid, role, remove } = body;
  try {
    switch (method) {
      case "POST":
        // Get the ID token passed.
        console.log(role);
        // Verify the ID token and decode its payload.
        firebaseAdmin.auth().setCustomUserClaims(uid, { [role]: !remove });

        // Tell client to refresh token on user.
        res.end(
          JSON.stringify({
            status: "success"
          })
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
