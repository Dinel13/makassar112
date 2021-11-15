import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectName } from "../store/authSlice";
import DropdownAccount from "./elements/Account";

const MainNavigation = () => {
  const name = useSelector(selectName);
  const [isDark, seTIsDark] = useState(true);

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
      seTIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      seTIsDark(false);
    }
  };

  return (
    <header className="w-full bg-red-500 dark:bg-dark1 text-white px-6 py-4 flex justify-between items-center ">
      <Link href="/">
        <a>
          <div className="text-2xl font-bold">Makassar 112</div>
        </a>
      </Link>
      <nav>
        <ul className="flex justify-end items-center space-x-3 relative">
          <li>
            <Link href="/destiny">Laporan</Link>
          </li>
          <li>
            <Link href="/destiny/create">Phonebook</Link>
          </li>
          {name ? (
            <DropdownAccount name={name} />
          ) : (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
          <li>
            <button onClick={toggleMode} className="flex items-center">
              {isDark ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
