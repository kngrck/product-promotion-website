import { Provider } from "next-auth/client";

import AdminLayout from "../components/layout/admin/admin-layout";
import Layout from "../components/layout/layout";

import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import { createGlobalStyle } from "styled-components";
import theme from "../lib/theme";

function MyApp({ Component, pageProps, router }: AppProps) {
  if (router.pathname.includes("admin")) {
    return (
      <Provider session={pageProps.session}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <AdminLayout>
            <Component {...pageProps} />
          </AdminLayout>
        </ThemeProvider>
      </Provider>
    );
  }
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

const GlobalStyle = createGlobalStyle`

html,
body,
body > div:first-child,
div#__next,
div#__next > div {
  height: 100%;
  width: 100%;
  scroll-behavior: smooth;
}

html,
body {
  padding: 0;
  margin: 0;
  font-family: "Roboto", sans-serif;

}



a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}

`;
