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
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
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
