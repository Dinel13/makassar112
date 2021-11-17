import React from "react";

import style from "./loading.module.css";

export default function Loading() {
  return (
    <div className="w-full z-50 flex flex-col items-center justify-center mb-5">
      <div
        className={`${style.loader} ease-linear rounded-full border-8 border-t-8 border-gray-400 h-12 w-12 mb-4`}
      ></div>
      <h2 className="text-center  text-xl font-semibold">
        Loading...
      </h2>
      <p className="w-2/3 md:w-1/3 text-center ">
        Kami butuh sedikit waktu untuk mencari data dari server.
      </p>
    </div>
  );
}
