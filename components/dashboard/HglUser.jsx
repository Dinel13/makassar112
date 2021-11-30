import React, { useCallback, useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { showNotif } from "../../store/notifSlice";
import { selectIsNeedRFHglUser } from "../../store/rfSlice";
import { selectIsDark } from "../../store/themeSlice";

import { NoData } from "../table/helper";
import { HiglightUser } from "./HiglightButton";

createTheme(
  "solaridz",
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
    grow: 2,
  },
  {
    name: "Deskripsi",
    selector: (row) => row.deskripsi,
    sortable: true,
    wrap: true,
    grow: 3,
  },
  {
    name: "Lokasi",
    selector: (row) => row.lokasi,
    sortable: true,
    wrap: true,
    grow: 2,
  },
  {
    name: "Aksi",
    selector: (row) => HiglightUser(row),
    sortable: false,
    grow: 2,
  },
];

const customStyles = {
  headCells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "6px",
    },
  },
  cells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "6px",
    },
  },
};

export default function HglUser({ dataHg, setDataHg }) {
  const isDark = useSelector(selectIsDark);
  const needRefresh = useSelector(selectIsNeedRFHglUser);
  const dispatch = useDispatch();

  const getData = useCallback(async () => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/highlight/get`,
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
  }, [dispatch, setDataHg]);

  useEffect(() => {
    getData();
  }, [getData, needRefresh]);

  return (
    <div className="">
      <h2 className="text-subtitle font-medium lg:text-left mb-5 mt-10">
        Highlight Front page
      </h2>
      <div className="dark-card rounded-xl pt-2">
        <DataTable
          sort
          className="dark-card"
          defaultSortFieldId={1}
          columns={Hcolumns}
          data={dataHg}
          theme={isDark ? "solaridz" : "light"}
          noDataComponent={<NoData />}
          highlightOnHover
          customStyles={customStyles}
        ></DataTable>
      </div>
    </div>
  );
}
