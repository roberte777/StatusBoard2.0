import "../styles/globals.css";
import Layout from "../src/layout/layout";
import { NextComponentType, NextPageContext } from "next";
import ThemeProvdiers from "../src/layout/Providers/ThemeProviders";
import { SessionProvider } from "next-auth/react";

type ComponentType = NextComponentType<NextPageContext, any, {}> & {
    title: string;
};

interface Props {
    Component: ComponentType;
    pageProps: any;
}

function MyApp({ Component, pageProps }: Props) {
    return (
        <SessionProvider session={pageProps.session}>
            <ThemeProvdiers>
                <Layout title={Component.title}>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvdiers>
        </SessionProvider>
    );
}
export default MyApp;
