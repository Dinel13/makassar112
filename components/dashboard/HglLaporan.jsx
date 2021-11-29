import React, { useState, useEffect, useRef } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { parseDateSQLtoString } from "../../lib/time";
import { showNotif } from "../../store/notifSlice";
import { selectIsNeedRefresh } from "../../store/rfSlice";
import { selectIsDark } from "../../store/themeSlice";

import Loading from "../loading/Loading";
import { NoData } from "../table/helper";
import ExpandebleTable from "./ExpandebleTable";
import { UnHiglightButton } from "./HiglightButton";

createTheme(
  "solariz",
  {
    text: {
      primary: "#F9FAFB",
      secondary: "#F3F4F6",
    },
    background: {
      default: "#3E2C41",
    },
    context: {
      background: "#cb4b16",
      text: "#fff",
    },
    divider: {
      default: "#6B7280",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(29, 28, 28, 0.51)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const Hcolumns = [
  {
    name: "Kategori",
    selector: (row) => row.kategori.replace("/", " "),
    sortable: true,
    wrap: true,
    grow: 0,
  },
  {
    name: "Deskripsi",
    selector: (row) => row.deskripsi,
    sortable: true,
    wrap: true,
    grow: 2,
  },
  {
    name: "Alamat",
    selector: (row) => "KEC. " + row.kecamatan + " KEL. " + row.kelurahan,
    sortable: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Nama Pelapor",
    selector: (row) => row.pelapor,
    sortable: true,
    wrap: true,
    grow: 1,
  },
  {
    name: "Aksi",
    selector: (row) => UnHiglightButton(row.id_laporan),
    sortable: false,
    grow: 0,
  },
];

const customStyles = {
  rows: {
    style: {
      // padding: "0px",
      // margin: "0px",
      // minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "4px", // override the cell padding for head cells
      paddingRight: "4px",
    },
  },
  cells: {
    style: {
      padding: "4px", // override the cell padding for data cells
    },
  },
};

let timerr;

export default function HglLaporan({dataHg, setDataHg}) {
  const isDark = useSelector(selectIsDark);
  const needRefresh = useSelector(selectIsNeedRefresh);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/highlight/all`,
        {
          method: "GET",
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa mendapat data");
      }

      setDataHg(data);
    } catch (error) {
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    }
  };

  const getDataAgain = async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/highlight/all`,
        {
          method: "GET",
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(
          "Tidak bisa mendapat data higlight terbaru, pastikan koneksi kamu baik"
        );
      }
      setDataHg(data);
    } catch (error) {
      clearInterval(timerr);
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    }
  };

  useEffect(() => {
    getData();
  }, [needRefresh]);

  useEffect(() => {
    timerr = setInterval(() => {
      getDataAgain();
    }, 60 * 1000);
    return () => {
      clearInterval(timerr);
    };
  }, []);

  return (
    <>
      {dataHg && dataHg.length === 0 && (
        <div className="lg:w-3/12 lg:-mt-206">
          <h2 className="text-subtitle font-medium lg:text-left mb-5">
            Highlight Laporan
          </h2>
          <div className="dark-card rounded-xl pt-2">
            <DataTable
              className="dark-card"
              data={dataHg}
              theme={isDark ? "solariz" : "light"}
              noDataComponent={<NoData />}
              customStyles={customStyles}
            ></DataTable>
          </div>
        </div>
      )}
      {dataHg && dataHg.length > 0 && (
        <div className="lg:w-1/2 lg:-mt-206">
          <h2 className="text-subtitle font-medium lg:text-left mb-5">
            Highlight Laporan
          </h2>
          <div className="dark-card rounded-xl pt-2">
            <DataTable
              sort
              className="dark-card"
              defaultSortFieldId={1}
              columns={Hcolumns}
              data={dataHg}
              expandableRows
              expandableRowsComponent={ExpandebleTable}
              theme={isDark ? "solariz" : "light"}
              noDataComponent={<NoData />}
              highlightOnHover
              customStyles={customStyles}
            ></DataTable>
          </div>
        </div>
      )}
    </>
  );
}
