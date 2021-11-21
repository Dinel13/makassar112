import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/themeSlice";

import Dashbord from "./Dashbord";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
  const router = useRouter();
  const baseUrl = router.pathname.split("/")[1];
  const dispatch = useDispatch();

  // when first render
  // cek if theme is dark or undefined then set theme dark
  // instead set theme light
  useEffect(() => {
    if (localStorage.theme === undefined || localStorage.theme === "dark") {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      dispatch(toggleTheme({ isDark: true }));
    } else {
      localStorage.theme === "light";
      document.documentElement.classList.remove("dark");
      dispatch(toggleTheme({ isDark: false }));
    }
  }, [dispatch]);

  const toggleMode = () => {
    localStorage.theme === "light"
      ? (localStorage.theme = "dark")
      : (localStorage.theme = "light");
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      dispatch(toggleTheme({ isDark: true }));
    } else {
      document.documentElement.classList.remove("dark");
      dispatch(toggleTheme({ isDark: false }));
    }
  };

  return baseUrl === "dashboard" ? (
    <Dashbord toggleMode={toggleMode}>
      {/* <main
        className="container m-0 mx-auto px-1 sm:px-2 md:px-3 lg:px-5 xl:px-7 2xl:px-9 py-2 sm:py-4 md:py-7 lg:py-10 xl:py-12 2xl:py-14"
        style={{ minHeight: "70vh" }}
      > */}
      {props.children}
      {/* </main> */}
    </Dashbord>
  ) : (
    <>
      <Header toggleMode={toggleMode} />
      <main className="dark-main" style={{ minHeight: "70vh" }}>
        {/* <div className="container m-0 mx-auto px-1 sm:px-2 md:px-3 lg:px-5 xl:px-7 2xl:px-9 py-2 sm:py-4 md:py-7 lg:py-10 xl:py-12 2xl:py-14"> */}
        {props.children}
        {/* </div> */}
      </main>
      <Footer />
    </>
  );
}

export default Layout;
