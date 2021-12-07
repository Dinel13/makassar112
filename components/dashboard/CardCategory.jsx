import React from "react";

export default function CardCategory({ title, total, children }) {
  return (
    <div className="flex items-center justify-between p-6  w-56 rounded-xl shadow-lg dark-card">
      <div>
        <span className="text-sm font-semibold ">{title}</span>
        <h1 className="text-xl ">{total}</h1>
      </div>
      <div>{children}</div>
    </div>
  );
}
