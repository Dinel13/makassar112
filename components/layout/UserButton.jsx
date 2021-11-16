import { useState } from "react";
import Image from "next/image";
import { signOut } from "next-auth/client";
import Link from "next/link";

export default function UserButton() {
  const [isDrdwnUser, setIsDrdwnUser] = useState(false);

  const togledrdwnUser = () => {
    console.log(isDrdwnUser);
    setIsDrdwnUser(!isDrdwnUser);
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
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>

      {isDrdwnUser && (
        <>
          <div
            onClick={() => togledrdwnUser()}
            className="fixed inset-0 h-full w-full z-10"
          ></div>
          <div className="absolute right-0 mt-2 w-48 py-2.5 bg-white dark:bg-dark3 rounded-md overflow-hidden shadow-xl z-40">
            <Link href="/profile">
              <a className="block px-4 py-2 text-sm 0 hover:text-gray-600 dark:hover:text-gray-300">
                Profile
              </a>
            </Link>
            <button
              onClick={() => signOut()}
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
