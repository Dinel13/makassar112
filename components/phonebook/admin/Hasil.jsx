import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotif } from "../../../store/notifSlice";
import Item from "./ItemForAdmin";

export default function Hasil({ data, onUpdate, cancel }) {
  const removeItem = (id) => {
    data = data.filter((item) => item.id !== id);
  };

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const result = await fetch(
  //         `${process.env.NEXT_PUBLIC_URL}/phonebook/all-admin`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const resJson = await result.json();
  //       if (!result.ok) {
  //         throw new Error(resJson.error || "Tidak bisa mendapat data");
  //       }
  //       setData(resJson);
  //     } catch (error) {
  //       dispatch(
  //         showNotif({
  //           status: "Error",
  //           message: error.message,
  //           action: null,
  //         })
  //       );
  //     }
  //   }
  //   getData();
  // }, [dispatch, needRefh, needRefsh, refresh]);
  // refresh jika item dihapus
  // needRefh jika item ditmabhag
  // needRefsh jika item diupdate

  return (
    <div className="flex flex-col my-12">
      <h2 className="text-title mb-3 text-center">Hasil pencarian phone book</h2>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" shadow overflow-hidden border-b border-gray-600 sm:rounded-lg dark-card">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-opacity-70">
                <tr>
                  <th
                    scope="col"
                    className=" px-6  py-4 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    Nama Kontak
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider  "
                  >
                    Nomor Kontak
                  </th>
                  <th
                    scope="col"
                    className="  px-6  py-3  text-left text-xs  font-medium    uppercase  tracking-wider "
                  >
                    Kategori
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Wilayah
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Lokasi
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Sifat
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Diupdet
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200">
                {data &&
                  data.map((item) => (
                    <Item
                      key={item.id}
                      data={item}
                      onUpdate={onUpdate}
                      removeItem={removeItem}
                    />
                  ))}
              </tbody>
            </table>
           
          </div>

          <button
                className="underline font-semibold my-4"
                  onClick={cancel}
                >
                  lihat semua data
                </button>
        </div>
      </div>
    </div>
  );
}
