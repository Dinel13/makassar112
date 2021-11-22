import { useCallback, useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";

import { parseDateSQLtoString } from "../../lib/time";
import { showNotif } from "../../store/notifSlice";
import { selectIsDark } from "../../store/themeSlice";
import ExportExcel from "../button/ExportExcel";
import ExportPDF from "../button/ExportPDF";
import Pagination from "../button/Pagination";
import Loading from "../loading/Loading";
import { SortIcon, NoData } from "../table/helper";
import PendingButton from "../button/Pending";

createTheme(
  "solarized",
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

const HiglightButton = (dataId) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const highlight = async (id) => {
    setLoading(true);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/hightlight`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa menyimpan data");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(
        showNotif({
          status: "Error",
          message: error.message,
          action: null,
        })
      );
    }
  };

  if (loading) {
    return <PendingButton />;
  } else {
    return (
      <button
        onClick={() => highlight(dataId)}
        className="py-1 px-2 rounded btn-pri"
      >
        Higlight
      </button>
    );
  }
};

const columns = [
  {
    name: "ID Laporan",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "Kategori",
    selector: (row) => row.kategori,
    sortable: true,
  },
  {
    name: "Deskripsi",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "Lokasi Kejadian",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "Catatan Lokasi",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "Waktu Lapor",
    selector: (row) => row.deskripsi,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.kategorid,
    sortable: true,
  },
  {
    name: "Nama Pelapor",
    selector: (row) => parseDateSQLtoString(row.updated_at),
    sortable: true,
  },
  {
    name: "No. Telp",
    selector: (row) => parseDateSQLtoString(row.updated_at),
    sortable: true,
  },
  {
    name: "Tipe Panggilan",
    selector: (row) => parseDateSQLtoString(row.updated_at),
    sortable: true,
  },
  {
    name: "Agen L1",
    selector: (row) => parseDateSQLtoString(row.updated_at),
    sortable: true,
  },
  {
    name: "Dinas Terkait",
    selector: (row) => parseDateSQLtoString(row.updated_at),
    sortable: true,
  },
  {
    name: "Aksi",
    selector: (row) => HiglightButton(row.id),
    sortable: true,
  },
];

const avoidError = true;

export default function LaporanTerbaru() {
  const [total, setTotal] = useState({ loading: true, data: null });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const isDark = useSelector(selectIsDark);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const getData = async (page) => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/all/${page}`,
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

  const getTotal = async () => {
    setTotal((s) => ({ ...s, loading: true }));
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/total`,
        {
          method: "GET",
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa mendapat data");
      }
      setTotal({
        loading: false,
        data: data.count,
      });
    } catch (error) {
      setTotal({
        loading: false,
        data: null,
      });
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
    getTotal();
    getData(1);
  }, []);

  const prevHandler = () => {
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

  const nextHandler = () => {
    if (total.data < page * 20) {
      dispatch(
        showNotif({
          status: "Error",
          message: "Semua data sudah ditampilkan",
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
          Laporoan terbaru
        </h2>
        <div className="flex justify-end items-center gap-2">
          {data && !loading && <ExportPDF data={data} />}
          {data && !loading && <ExportExcel data={data} />}
        </div>
      </div>
      {!loading && data ? (
        <>
          <div className="dark-card rounded-xl py-2">
            <DataTable
              sort
              className="dark-card"
              defaultSortFieldId={1}
              columns={columns}
              data={data}
              theme={isDark ? "solarized" : "light"}
              // sortIcon={<SortIcon />}
              // striped
              noDataComponent={<NoData />}
              highlightOnHover
            ></DataTable>
          </div>
          {!total.loading && (
            <Pagination
              page={page}
              total={total.data}
              lanjut={nextHandler}
              belum={prevHandler}
            />
          )}
        </>
      ) : (
        <div className="dark-card rounded-xl py-2">
          <Loading />
        </div>
      )}
    </div>
  );
}
