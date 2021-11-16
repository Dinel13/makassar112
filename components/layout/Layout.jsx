import { useRouter } from "next/router";
import { useEffect } from "react";

import Dashbord from "./Dashbord";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
  const router = useRouter();
  const baseUrl = router.pathname.split("/")[1];

  // const [isDark, seTIsDark] = useState(true);

  const toggleMode = () => {
    if (localStorage.theme === undefined) {
      localStorage.theme = "dark";
    }
    localStorage.theme === "light"
      ? (localStorage.theme = "dark")
      : (localStorage.theme = "light");
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      // seTIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      // seTIsDark(false);
    }
  };


  useEffect(() => {
    toggleMode();
  }, []);

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
      <main
        className="dark-main"
        style={{ minHeight: "70vh" }}
      >
        <div className="container m-0 mx-auto px-1 sm:px-2 md:px-3 lg:px-5 xl:px-7 2xl:px-9 py-2 sm:py-4 md:py-7 lg:py-10 xl:py-12 2xl:py-14">
        {props.children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
