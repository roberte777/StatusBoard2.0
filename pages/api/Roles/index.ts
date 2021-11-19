import { Request, Response } from "express";
import { firebaseAdmin } from "../../../src/firebase/admin";
export default async (req: Request, res: Response) => {
  const {
    method,
    body: { role, remove }
  } = req;
  try {
    switch (method) {
      case "POST":
        // Get the ID token passed.
        const idToken = req.body.idToken;

        // Verify the ID token and decode its payload.
        const claims = await firebaseAdmin.auth().verifyIdToken(idToken);

        // Verify user is eligible for additional privileges.
        if (typeof claims.email !== "undefined") {
          // Add custom claims for additional privileges.
          await firebaseAdmin.auth().setCustomUserClaims(claims.sub, {
            [role]: !remove
          });

          // Tell client to refresh token on user.
          res.end(
            JSON.stringify({
              status: "success"
            })
          );
        } else {
          // Return nothing.
          res.end(JSON.stringify({ status: "ineligible" }));
        }

        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};
