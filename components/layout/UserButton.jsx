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
    signOut({redirect: false});
  };

  return (
    <div className="relative mr-3">
      <button
        onClick={() => togledrdwnUser()}
        className="flex items-center focus:outline-none"
      >
        <span className="pr-1">{nama.substring(0, 8)}</span>
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
          <div className="absolute right-0 mt-2 w-48 py-2.5 bg-white dark:bg-dark3 rounded-md overflow-hidden shadow-xl z-40">
            {/* <Link href="/profile">
              <a className="block px-4 py-2 text-sm 0 hover:text-gray-600 dark:hover:text-gray-300">
                Profile
              </a>
            </Link> */}
            <button
              onClick={signOutUser}
              className="block px-4 py-2 text-sm hover:text-gray-600 dark:hover:text-gray-300"
            >
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
