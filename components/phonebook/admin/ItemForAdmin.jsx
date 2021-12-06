import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { parseDateSQLtoString } from "../../../lib/time";
import { showNotif } from "../../../store/notifSlice";

export default function ItemForAdmin({ data, onUpdate, removeItem }) {
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(
      showNotif({
        status: "Confirm",
        message: "Anda yakin ingin menghapus data ini?",
        action: ["hapusPhone", id, () => removeItem(id)],
      })
    );
  };

  return (
    <tr>
      <td className="p-3 whitespace-nowrap text-xs">{data.nama}</td>
      <td className="p-3 whitespace-nowrap text-xs">{data.phone}</td>
      <td className="p-3 whitespace-nowrap text-xs">{data.kategori}</td>
      <td className="p-3 whitespace-normal text-xs">{data.wilayah}</td>
      <td className="p-3 whitespace-normal text-xs">{data.alamat}</td>
      <td className="p-3 whitespace-nowrap text-xs ">
        <a
          className="flex justify-center"
          target="_blank"
          rel="noreferrer"
          href={data.lokasi}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        </a>
      </td>
      <td className="p-3 whitespace-nowrap text-xs ">{data.status}</td>
      <td className="p-3 whitespace-nowrap text-xs ">
        {parseDateSQLtoString(data.updated_at)}
      </td>
      <td className="p-3 whitespace-nowrap text-xs font-medium">
        <button onClick={() => onUpdate(data)} className="pr-2">
          Update
        </button>
        <button onClick={() => deleteHandler(data.id)} className="">
          Hapus
        </button>
      </td>
    </tr>
  );
}
