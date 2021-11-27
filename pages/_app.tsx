import "../styles/globals.css";
import Layout from "../src/layout/layout";
import { NextComponentType, NextPageContext } from "next";
import ThemeProvdiers from "../src/layout/Providers/ThemeProviders";
import React from "react";
import AuthProvider from "../src/firebase/provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import { CircularProgress, Container } from "@mui/material";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Loading from "@/components/Loading";

// import { UserProvider } from "@auth0/nextjs-auth0";
// import { useUser } from "@auth0/nextjs-auth0";

type ComponentType = NextComponentType<NextPageContext, any, {}> & {
  title: string;
  auth: boolean;
  noPadding: boolean;
};

interface Props {
  Component: ComponentType;
  pageProps: any;
}
const Auth = ({ children }: { children: React.ReactNode }) => {
  const [user, loading] = useAuthState(getAuth());
  if (loading) {
    return <Loading />;
  } else if (!user) {
    return <>SignUp</>;
  }
  return <div>{children}</div>;
};

function MyApp({ Component, pageProps }: Props) {
  return (
    <AuthProvider>
      <ThemeProvdiers>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Layout title={Component.title} noPadding={Component.noPadding}>
            {Component.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </LocalizationProvider>
      </ThemeProvdiers>
    </AuthProvider>
  );
}
export default MyApp;
