import "../styles/globals.css";
import Layout from "../src/layout/layout";
import { NextComponentType, NextPageContext } from "next";
import ThemeProvdiers from "../src/layout/Providers/ThemeProviders";
import React from "react";
import AuthProvider from "../src/firebase/provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import { CircularProgress, Container } from "@mui/material";

// import { UserProvider } from "@auth0/nextjs-auth0";
// import { useUser } from "@auth0/nextjs-auth0";

type ComponentType = NextComponentType<NextPageContext, any, {}> & {
  title: string;
  auth: boolean;
};

interface Props {
  Component: ComponentType;
  pageProps: any;
}
const Auth = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(getAuth());
  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  } else if (!user) {
    return <>SignUp</>;
  }
  return <div>{children}</div>;
};

function MyApp({ Component, pageProps }: Props) {
  return (
    <AuthProvider>
      <ThemeProvdiers>
        <Layout title={Component.title}>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ThemeProvdiers>
    </AuthProvider>
  );
}
export default MyApp;