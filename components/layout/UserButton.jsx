import { useState } from "react";
import { signOut } from "next-auth/client";
import router from "next/router";

export default function UserButton({ nama }) {
  const [isDrdwnUser, setIsDrdwnUser] = useState(false);

  const togledrdwnUser = () => {
    setIsDrdwnUser(!isDrdwnUser);
  };

  const signOutUser = () => {
    router.replace("/masuk");
    signOut({ redirect: false });
  };

  return (
    <div className="relative mr-3">
      <button
        onClick={() => togledrdwnUser()}
        className="flex items-center focus:outline-none"
      >
        <span className="pr-1">Profile</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8"
          aria-hidden="true"
          role="img"
          width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 32 32"
        >
          <g fill="currentColor">
            <path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5z" />
            <path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm7.992 22.926A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z" />
          </g>
        </svg>
      </button>

      {isDrdwnUser && (
        <>
          <div
            onClick={() => togledrdwnUser()}
            className="fixed inset-0 h-full w-full z-10"
          ></div>
          <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-dark3 rounded-md overflow-hidden shadow-xl z-40 divide-y">
            <div className="flex items-center px-3  mb-1.5">
              <div className="rounded-full dark-sidebar p-2 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87zM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zm-6 0c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="pr-1">{nama}</span>
            </div>

            <div className="flex px-4 justify-between items-center ">
              <button
                className="hover:text-gray-600 dark:hover:text-gray-300"
                onClick={() => togledrdwnUser()}
              >
                Cancel
              </button>
              <button
                onClick={signOutUser}
                className="flex items-center py-2 text-sm hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
