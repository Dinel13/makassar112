import Link from "next/link";
import DarkModeButton from "./DarkModeButton";
import Image from "next/image";
// import { useState } from "react";

const MainNavigation = ({ toggleMode }) => {
  return (
    <header className="w-full sticky top-0 z-40 dark-nav px-6 py-3 flex justify-between items-center">
      <Link href="/">
        <a className="flex items-center">
          <Image src="/makassar.png" alt="makassar" width="38" height="42"></Image>
          <span className="text-xl font-medium ml-2">Makassar</span>
        </a>
      </Link>
      <nav>
        <ul className="flex justify-end items-center space-x-3 relative">
          <li>
            <Link href="/">Beranda</Link>
          </li>
          <li>
            <Link href="/masuk">Lo</Link>
          </li>
          <li className="flex items-center ">
            <DarkModeButton toggleMode={toggleMode} />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
