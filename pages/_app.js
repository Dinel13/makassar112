import Head from "next/head";
import { Provider } from "react-redux";
import { Provider as NextProvider } from "next-auth";

import store from "../store/index";
import Layout from "../components/layout/Layout";
import ErrorModal from "../components/modal/notifModal";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <NextProvider session={pageProps.session}>
      <Provider store={store}>
        <ErrorModal />
        <Layout>
          <Head>
            <title>Makassar 112</title>
            <meta
              property="og:title"
              content="makassar 112 smart city"
              key="makassar 112"
            />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </NextProvider>
  );
}

export default MyApp;
