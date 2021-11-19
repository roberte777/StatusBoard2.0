import { Request, Response } from "express";
import { firebaseAdmin } from "@/firebase/admin";
export default async (req: Request, res: Response) => {
  const { method } = req;
  try {
    switch (method) {
      case "GET":
        firebaseAdmin
          .auth()
          .getUsers([
            { uid: "uid1" },
            { email: "user2@example.com" },
            { phoneNumber: "+15555550003" },
            { providerId: "google.com", providerUid: "google_uid4" }
          ])
          .then((getUsersResult) => {
            console.log("Successfully fetched user data:");
            getUsersResult.users.forEach((userRecord) => {
              console.log(userRecord);
            });

            console.log(
              "Unable to find users corresponding to these identifiers:"
            );
            getUsersResult.notFound.forEach((userIdentifier) => {
              console.log(userIdentifier);
            });
          })
          .catch((error) => {
            console.log("Error fetching user data:", error);
          });
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
    res.status(400).send({ error: e });
  }
};
