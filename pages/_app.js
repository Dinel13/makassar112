import Head from "next/head";
import { Provider } from "react-redux";

import store from "../store/index";
import Layout from "../components/Layout";
import ErrorModal from "../components/modal/notifModal";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ErrorModal />
      <Layout>
        <Head>
          <title>Makassar 112</title>
          <meta property="og:title" content="makassar 112 smart city" key="makassar 112" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
