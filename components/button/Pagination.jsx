import React from "react";

export default function Pagination({ lanjut, belum, page}) {
  return (
    <div className="flex item-center justify-center my-12">
      <button
        onClick={belum}
        className="flex items-center text-lg tracking-tighter hover:text-blue-700 focus:outline-none  border border-gray-600 rounded-full link-scale"
      >
        <div className="h-10 w-10 mr-1 flex justify-center items-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
      </button>
      { page > 1 && <div className="flex mx-2 items-center justify-center h-10 w-10 font-bold">
        <span>{page - 1}</span>
      </div> }
      <div className="flex mx-2 items-center justify-center h-10 w-10 font-bold rounded-full dark-card">
        <span>{page}</span>
      </div>
      <div className="flex mx-2 items-center justify-center h-10 w-10 font-bold rounded-full ">
        <span>{page + 1}</span>
      </div>
      { page == 1 && <div className="flex mx-2 items-center justify-center h-10 w-10 font-bold ">
        <span>{page + 2}</span>
      </div> }
      <button
        onClick={lanjut}
        className="flex items-center text-lg tracking-tighter hover:text-blue-700 focus:outline-none border border-gray-600 rounded-full link-scale"
      >
        <div className="h-10 w-10 ml-1 flex justify-center items-center rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      </button>
    </div>
  );
}
