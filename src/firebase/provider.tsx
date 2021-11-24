import React, { createContext, useState, useEffect } from "react";
import { onAuthStateChanged, User, getAuth } from "@firebase/auth";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from ".";

const FirebaseContext = createContext<
  { user: User | null; loading?: boolean; error: Error | undefined } | undefined
>(undefined);

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

const FirebaseProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => setError(error)
    );
    return () => unsubscribe();
  }, []);
  return (
    <FirebaseContext.Provider value={{ user, error }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
