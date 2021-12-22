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
  pageRoles = [],
  router,
}: {
  children: React.ReactNode;
  pageRoles: string[];
  router: NextRouter;
}) => {
  const [user, loading] = useAuthState(getAuth());
  const [rolesLoading, setRolesLoading] = useState(true);
  const [roles, setRoles] = useState<any>([]);
  useEffect(() => {
    const getRoles = async () => {
      setRolesLoading(true);
      if (user) {
        await user
          .getIdTokenResult()
          .then(async (idTokenResult) => {
            setRoles(idTokenResult.claims);
          })
          .finally(() => setRolesLoading(false));
      } else {
        setRoles([]);
        setRolesLoading(false);
      }
    };
    getRoles();
  }, [user, loading]);

  if (loading || rolesLoading) {
    return <Loading />;
  } else if (!user) {
    router.replace("/Auth/login");
    return <div>Login</div>;
  } else {
    let permitted = false;
    console.log(roles);
    if (roles.length === 0) permitted = true;
    pageRoles.forEach((role: any) => {
      console.log(roles);
      if (roles[role]) {
        permitted = true;
      }
    });

    if (!permitted) {
      return <>Not Permitted</>;
    }
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
              <Auth pageRoles={Component.roles} router={router}>
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
