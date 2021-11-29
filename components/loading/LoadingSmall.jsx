import React from "react";

import style from "./loading.module.css";

export default function LoadingSmall() {
  return (
    <div className="flex flex-col justify-center items-center w-full z-50 my-5">
      <div
        className={`${style.loader} ease-linear rounded-full border-8 border-t-8 border-gray-400 h-10 w-10 mb-4`}
      ></div>
      <h2 className="text-center text-xl font-semibold">
        Loading...
      </h2>
      <p className="text-center text-sm w-full">
        Kami butuh sedikit waktu untuk memperbaharui data.
      </p>
    </div>
  );
}
