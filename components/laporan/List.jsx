import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Preview, print } from "react-html2pdf";

import { showNotif } from "../../store/notifSlice";
import Pagination from "../button/Pagination";
import Item from "./Item";
import { exportToExcel } from "../../lib/exportExcel";

export default function ListLaporan() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const getData = useCallback(
    async (page) => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/laporan/all/${page}`,
          {
            method: "GET",
          }
        );
        const resJson = await result.json();
        if (!result.ok) {
          throw new Error(resJson.error || "Tidak bisa mendapat data");
        }
        setData(resJson);
      } catch (error) {
        dispatch(
          showNotif({
            status: "Error",
            message: error.message,
            action: null,
          })
        );
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getData(page);
  // }, [page, getData]);
}, []);

  const prevHandler = async (e) => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      getData(page);
    } else {
      dispatch(
        showNotif({
          status: "Error",
          message: "Kamu sudah di halaman awal",
          action: null,
        })
      );
      return;
    }
  };

  const nextHandler = async (e) => {
    if (data.length === 0) {
      dispatch(
        showNotif({
          status: "Error",
          message: "Sudah tidak ada halaman selanjutnya",
          action: null,
        })
      );
      return;
    } else {
      setPage((prev) => prev + 1);
      getData(page);
    }
  };

  return (
    <div className="flex flex-col my-12">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-subtitle font-medium  text-center">
          Semua Data Laporan
        </h2>
        <div className="flex justify-end items-center gap-2">
          <button
            onClick={() => print("a", "jsx-template")}
            className="btn-pri py-1.5 text-sm px-5 tracking-wider"
          >
            PDF
          </button>

          <button
            onClick={() => exportToExcel(data, "Laporan")}
            className="btn-pri py-1.5 text-sm px-5 tracking-wider"
          >
            Excel
          </button>
        </div>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" shadow overflow-hidden border-b border-gray-600 sm:rounded-lg dark-card">
            <Preview id={"jsx-template"}>
              <table className="min-w-full divide-y divide-gray-200" id="table">
                <thead className="bg-opacity-70">
                  <tr>
                    <th
                      scope="col"
                      className=" px-6  py-3 text-left text-xs font-medium uppercase tracking-wider "
                    >
                      ID
                    </th>

                    <th
                      scope="col"
                      className="  px-6  py-3  text-left text-xs  font-medium    uppercase  tracking-wider "
                    >
                      Kategori
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider  "
                    >
                      Deskripsi
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      Alamat
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
                      Waktu
                    </th>
                    <th
                      scope="col"
                      className=" px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data &&
                    data.map((item) => <Item key={item.id} data={item} />)}
                </tbody>
              </table>
            </Preview>
          </div>
        </div>
      </div>
      <Pagination page={page} lanjut={nextHandler} belum={prevHandler} />
    </div>
  );
}
