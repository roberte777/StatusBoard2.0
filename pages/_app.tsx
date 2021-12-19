import "../styles/globals.css";
import Layout from "../src/layout/Layout";
import { NextComponentType, NextPageContext } from "next";
import ThemeProvdiers from "../src/layout/Providers/ThemeProviders";
import React, { useEffect, useState } from "react";
import AuthProvider from "../src/firebase/provider";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "@firebase/auth";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Loading from "@/components/Loading";
import { NextRouter } from "next/router";

type ComponentType = NextComponentType<NextPageContext, any, {}> & {
  title: string;
  auth: boolean;
  noPadding: boolean;
  roles: string[];
};

interface Props {
  Component: ComponentType;
  pageProps: any;
  router: NextRouter;
}
const Auth = ({
  children,
  roles = [],
  router,
}: {
  children: React.ReactNode;
  roles: string[];
  router: NextRouter;
}) => {
  const [user, loading] = useAuthState(getAuth());
  const [rolesLoading, setRolesLoading] = useState(true);
  const [permitted, setPermitted] = useState(false);
  useEffect(() => {
    if (!loading && user) {
      if (roles.length === 0) setPermitted(true);
      user.getIdTokenResult().then(async (idTokenResult) => {
        roles.forEach((role) => {
          if (idTokenResult.claims[role]) {
            setPermitted(true);
          }
        });
        setRolesLoading(false);
      });
    } else if (!loading && !user) {
      setRolesLoading(false);
    }
  }, [user]);

  if (loading || rolesLoading) {
    return <Loading />;
  } else if (!user) {
    router.replace("/Auth/login");
    return <div>Login</div>;
  } else if (!permitted) {
    return <div>Not Permitted</div>;
  } else {
    return <div>{children}</div>;
  }
};

function MyApp({ Component, pageProps, router }: Props) {
  return (
    <AuthProvider>
      <ThemeProvdiers>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Layout title={Component.title} noPadding={Component.noPadding}>
            {Component.auth ? (
              <Auth roles={Component.roles} router={router}>
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
