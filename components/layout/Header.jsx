import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
// import { useState } from "react";

const MainNavigation = () => {
  return (
    <header className="w-full sticky top-0 z-40 bg-red-500 dark:bg-dark1 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/">
        <a>
          <div className="text-2xl font-bold">Makassar 112</div>
        </a>
      </Link>
      <nav>
        <ul className="flex justify-end items-center space-x-3 relative">
          <li>
            <Link href="phonebook">Phonebook</Link>
          </li>

          <li>
            <Link href="/masuk">Login</Link>
          </li>
          <li className="flex items-center ">
            <DarkModeButton />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
