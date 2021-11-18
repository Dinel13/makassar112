import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import XLSX from 'xlsx';

import { showNotif } from "../../store/notifSlice";
import Pagination from "../button/Pagination";
import Item from "./Item";

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
  }, [page, getData]);

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

  function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  }

  function exportTableToCSV(filename) {
    if (filename === "") {
      filename = "export";
    }
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [],
        cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++) row.push(cols[j].innerText);

      csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
  }

  function exportTableToExcel(filename) {
    if (filename === "") {
      filename = "export";
    }
    var wb = XLSX.utils.table_to_book(document.getElementById("table"), {
      sheet: "Sheet JS",
    });
    XLSX.writeFile(wb, filename);
  }

  function exportTableToPdf(filename) {
    if (filename === "") {
      filename = "export";
    }
    var doc = new jsPDF("p", "pt", "a4");
    doc.autoTable({
      html: "#table",
      margin: { top: 60 },
    });
    doc.save(filename + ".pdf");
  }

  return (
    <div className="flex flex-col my-12">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-subtitle font-medium  text-center">
          Semua Data Laporan
        </h2>
        <div className="flex justify-end items-center gap-2">
          <button 
          onClick={exportTableToPdf} className="btn-pri py-1.5 text-sm px-5 tracking-wider">
            PDF
          </button>
          <button
            onClick={exportTableToCSV}
            className="btn-pri py-1.5 text-sm px-5 tracking-wider"
          >
            Excel
          </button>
          <button
            onClick={exportTableToExcel}
            className="btn-pri py-1.5 text-sm px-5 tracking-wider"
          >
            Excel
          </button>
        </div>
      </div>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" shadow overflow-hidden border-b border-gray-600 sm:rounded-lg dark-card">
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
                {data && data.map((item) => <Item key={item.id} data={item} />)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination page={page} lanjut={nextHandler} belum={prevHandler} />
    </div>
  );
}
