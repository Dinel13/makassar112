import React from "react";
import Item from "./Item";
import { phone } from "../../data";

export default function Sering() {
  return (
    <div className="flex flex-col my-12">
      <h2 className="text-title mb-4 text-center">Layanan Pengaduan Publik</h2>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow  overflow-hidden sm:rounded-lg  dark-card">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-opacity-70">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider  "
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6  py-4 text-left text-xs font-medium uppercase tracking-wider "
                  >
                    Kategori
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs  font-medium    uppercase  tracking-wider "
                  >
                    Nama Instansi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Wilayah
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Alamat
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    No. Telp
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    No. Alternatif
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium  uppercase tracking-wider"
                  >
                    Update Terakhir
                  </th>
                </tr>
              </thead>
              <tbody className=" divide-y divide-gray-300">
                {phone.map((item) => (
                  <Item key={item.id} data={item} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
