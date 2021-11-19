import { Request, Response } from "express";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default async (req: Request, res: Response) => {
  const { method, body } = req;
  const user = JSON.parse(body);
  try {
    switch (method) {
      case "POST":
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, user.email, user.password).catch(
          (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            throw { errorCode, errorMessage };
          }
        );
        res.status(200).send("OK");

        break;
      default:
        break;
    }
  } catch (e) {
    res.status(400).send({ error: e });
  }
};
