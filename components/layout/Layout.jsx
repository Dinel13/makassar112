import { useRouter } from "next/router";
import { Fragment } from "react";
import Dashbord from "./Dashbord";

import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
  const router = useRouter();
  const baseUrl = router.pathname.split("/")[1];

  return baseUrl === "dashbord" ? (
    <Dashbord>
      {/* <main
        className="container m-0 mx-auto px-1 sm:px-2 md:px-3 lg:px-5 xl:px-7 2xl:px-9 py-2 sm:py-4 md:py-7 lg:py-10 xl:py-12 2xl:py-14"
        style={{ minHeight: "70vh" }}
      > */}
        {props.children}
      {/* </main> */}
    </Dashbord>
  ) : (
    <>
      <Header />
      <main
        className="container m-0 mx-auto px-1 sm:px-2 md:px-3 lg:px-5 xl:px-7 2xl:px-9 py-2 sm:py-4 md:py-7 lg:py-10 xl:py-12 2xl:py-14"
        style={{ minHeight: "70vh" }}
      >
        {props.children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
