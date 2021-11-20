import React from "react";

export default function ButtonKategori({ onClick, children, text }) {
  return (
    <div className="p-4 ">
      <button
        onClick={onClick}
        className="flex items-center px-6 py-4 justify-center shadow rounded-xl dark-card link-scale"
      >
        {children}
        <span className="ml-3">{text}</span>
      </button>
    </div>
  );
}
