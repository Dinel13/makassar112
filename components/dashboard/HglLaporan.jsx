import React, { useState, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";
import { parseDateSQLtoString } from "../../lib/time";
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
    selector: (row) => row.kategori,
    sortable: true,
    wrap: true,
    maxWidth: "80px",
  },
  {
    name: "Deskripsi",
    selector: (row) => row.deskripsi,
    sortable: true,
    wrap: true,
    maxWidth: "250px",
  },
  {
    name: "Alamat",
    selector: (row) => row.alamat,
    sortable: true,
    wrap: true,
    maxWidth: "120px",
  },
  {
    name: "Nama Pelapor",
    selector: (row) => row.pelapor,
    sortable: true,
    wrap: true,
    maxWidth: "100px",
  },
  {
    name: "Aksi",
    selector: (row) => UnHiglightButton(row.id),
    sortable: false,
    maxWidth: "50px",
    compact: true,
    // cell: (row) => {
    //   return (
    //     <div>
    //       <button
    //         className="btn btn-primary btn-sm"
    //         onClick={() => {
    //           window.open(`/laporan/${row.id}`, "_blank");
    //         }}
    //       >
    //         Lihat
    //       </button>
    //     </div>
    //   );
    // },
  },
];

const customStyles = {
  rows: {
    style: {
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

export default function HglLaporan() {
  const [data, setData] = useState([]);
  const isDark = useSelector(selectIsDark);
  const needRefresh = useSelector(selectIsNeedRefresh);

  console.log("needRefresh", needRefresh);
  

  const getData = async (page) => {
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

      setData(data);
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

  useEffect(() => {
    getData();
  }, [needRefresh]);

  return (
    <div className="lg:w-5/12 lg:-mt-206">
      <h2 className="text-subtitle font-medium lg:text-right mb-5">
        Highlight laporoan
      </h2>
      <div className="dark-card rounded-xl pt-2">
        <DataTable
          sort
          className="dark-card"
          defaultSortFieldId={1}
          columns={Hcolumns}
          data={data}
          expandableRows
          expandableRowsComponent={ExpandebleTable}
          theme={isDark ? "solarize" : "light"}
          noDataComponent={<NoData />}
          highlightOnHover
          customStyles={customStyles}
        ></DataTable>
      </div>
    </div>
  );
}
