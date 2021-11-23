import React, { useEffect, useState } from "react";
import Item from "./ItemForAdmin";

export default function Hasil({ data, onUpdate, cancel, updateResultSearch}) {
  const [allData, setAllData] = useState(data)
  
  const removeItem = (id) => {
    const newData = data.filter((item) => item.id !== id);
    setAllData(newData);
  };

  useEffect(() => {
    setAllData(data);
  }, [data]);

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
                    className=" px-6  py-4 text-center text-xs font-medium tracking-wider "
                  >
                    Nama Kontak
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium tracking-wider  "
                  >
                    Nomor Kontak
                  </th>
                  <th
                    scope="col"
                    className="  px-6  py-3  text-center text-xs  font-medium     tracking-wider "
                  >
                    Kategori
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  tracking-wider"
                  >
                    Wilayah
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  tracking-wider"
                  >
                    Alamat
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  tracking-wider"
                  >
                    Lokasi
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  tracking-wider"
                  >
                    Sifat
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  tracking-wider"
                  >
                    Update Terakhir
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-200 text-center">
                {allData &&
                  allData.map((item) => (
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
            Lihat semua data
          </button>
        </div>
      </div>
    </div>
  );
}
