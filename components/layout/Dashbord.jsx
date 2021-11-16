import { useEffect, useState } from "react";
import Image from "next/image";
import { getSession, signOut } from "next-auth/client";

import DarkModeButton from "./DarkModeButton";
import UserButton from "./UserButton";
import SideNav from "./SideNav";

export default function Dashbord({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  const toglesidebar = () => {
    console.log(isSidebarOpen);
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex fixed inset-0 h-screen bg-gray-100 dark:bg-main text-gray-800 dark:text-white ">
      <div
        className={
          isSidebarOpen
            ? "block fixed z-10  inset-0 bg-gray-900 opacity-50 transition-opacity lg:hidden"
            : "hidden fixed z-10  inset-0 bg-gray-900 opacity-50 transition-opacity "
        }
        onClick={() => toglesidebar()}
      ></div>

      {/* sidebar */}
      <div
        className={
          isSidebarOpen
            ? "translate-x-0 ease-out z-20 bg-gray-300 dark:bg-dark2 text-gray-800 dark:text-white fixed inset-y-0 left-0 w-52 transition duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
            : "-translate-x-full ease-in bg-gray-300 dark:bg-dark2 text-gray-800 dark:text-white fixed inset-y-0 left-0 w-52 transition duration-300 transform overflow-y-auto lg:translate-x-0 lg:static lg:inset-0"
        }
      >
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <span className="text-2xl mx-2 font-semibold">Makassar 112</span>
          </div>
        </div>
        <SideNav />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center py-4 px-6 bg-white dark:bg-dark1 text-gray-800 dark:text-white">
          <div className="flex items-center">
            {/* BUTTON TO SHOW THE SIDEBAR */}
            <button
              onClick={() => toglesidebar()}
              className="focus:outline-none lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* LOGO */}
            <div className="relative mx-4 lg:mx-0">
              {/* <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <svg
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>

              <input
                className="form-input w-32 sm:w-64 rounded-md pl-10 pr-4 focus:border-indigo-600"
                type="text"
                placeholder="Search"
              /> */}
              <h1>Makassar 112</h1>
            </div>
          </div>

          <div className="flex items-center">
            {session && <UserButton />}
            {!session && <button onClick={() => signOut()}>logout</button>}

            <DarkModeButton />
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
