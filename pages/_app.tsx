import "../styles/globals.css";
import Layout from "../src/layout/layout";
import { NextComponentType, NextPageContext } from "next";
import ThemeProvdiers from "../src/layout/Providers/ThemeProviders";
// import AuthProvider from "../src/firebase/provider";
import { getAuth } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import React, { ReactElement } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { UserProvider } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";
import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";

type ComponentType = NextComponentType<NextPageContext, any, {}> & {
  title: string;
  auth: boolean;
};

interface Props {
  Component: ComponentType;
  pageProps: any;
}

function MyApp({ Component, pageProps }: Props) {
  return (
    <UserProvider>
      <ThemeProvdiers>
        <Layout title={Component.title}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvdiers>
    </UserProvider>
  );
}
export default MyApp;
