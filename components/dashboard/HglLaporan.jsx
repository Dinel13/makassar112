import React, {useState, useEffect} from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";
import { parseDateSQLtoString } from "../../lib/time";
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
    name: "ID",
    selector: (row) => row.id,
    sortable: true,
    omit: true,
  },
  {
    name: "Kategori",
    selector: (row) => row.kategori,
    sortable: true,
  },
  {
    name: "Deskripsi",
    selector: (row) => row.deskripsi,
    sortable: true,
    // grow: 2,
  },
  {
    name: "Alamat",
    selector: (row) => row.alamat,
    sortable: true,
    wrap: true,
  },
  {
    name: "Nama Pelapor",
    selector: (row) => row.pelapor,
    sortable: true,
    wrap: true,
  },
  {
    name: "Aksi",
    selector: (row) => UnHiglightButton(row.id),
    sortable: true,
    wrap: true,
  },
];


const customStyles = {
  rows: {
    style: {
      minHeight: "72px", // override the row height
    },
  },
  headCells: {
    style: {
      paddingLeft: "4px", // override the cell padding for head cells
      paddingRight: "4px",
      whiteSpace: "normal",
    },
  },
  cells: {
    style: {
      paddingLeft: "4px", // override the cell padding for data cells
      paddingRight: "4px",
    },
  },
};

export default function HglLaporan() {
  const [data, setData] = useState([]);
  const isDark = useSelector(selectIsDark);

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
  }, [])

  return (
      <div className="lg:w-5/12">
        <h2 className="text-subtitle font-medium  text-center mb-5">
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
