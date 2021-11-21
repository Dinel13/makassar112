import { data } from "autoprefixer";
import React, { Children } from "react";

export default function CardMain({ number, text, children }) {
  return (
    <div className="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
      <div className="flex items-center px-5 py-6 shadow-sm rounded-md dark-card">
        <div className="p-3 rounded-full">{children}</div>
        <div className="mx-5">
          <h4 className="text-2xl font-semibold">{number}</h4>
          <div className="">{text}</div>
        </div>
      </div>
    </div>
  );
}
