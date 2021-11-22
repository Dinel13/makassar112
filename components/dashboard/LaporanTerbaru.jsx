import { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
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
    name: "Nama Kontak",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "Nomor Kontak",
    selector: (row) => row.deskripsi,
    sortable: true,
  },
  {
    name: "Nomor Kontak",
    selector: (row) => row.kategori,
    sortable: true,
  },
  {
    name: "Diupdate",
    selector: (row) => parseDateSQLtoString(row.updated_at),
    sortable: true,
  },
  {
    name: "Aksi",
    selector: (row) => HiglightButton(row.id),
    sortable: true,
  },
];

export default function LaporanTerbaru() {
  const [statusData, setStatus] = useState({ loading: true, data: [] });
  const isDark = useSelector(selectIsDark);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const getData = useCallback(
    async (page) => {
      setStatus((s) => ({ ...s, loading: true }));
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
        setStatus({
          loading: false,
          hasil: data,
        });
      } catch (error) {
        setStatus({
          loading: false,
          hasil: null,
        });
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

  return (
    <div className="flex flex-col my-12">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-5">
        <h2 className="text-subtitle font-medium  text-center">
          Laporoan terbaru
        </h2>
        <div className="flex justify-end items-center gap-2">
          {statusData.hasil && <ExportPDF data={statusData.hasil} />}
          {statusData.hasil && <ExportExcel data={statusData.hasil} />}
        </div>
      </div>
      {statusData.loading ? (
        <div className="dark-card rounded-xl py-2">
          <Loading />
        </div>
      ) : (
        <>
          <div className="dark-card rounded-xl py-2">
            <DataTable
              sort
              className="dark-card"
              defaultSortFieldId={1}
              columns={columns}
              data={statusData.hasil}
              theme={isDark ? "solarized" : "light"}
              sortIcon={<SortIcon />}
              // striped
              noDataComponent={<NoData />}
              highlightOnHover
            ></DataTable>
          </div>
          <Pagination page={page} lanjut={nextHandler} belum={prevHandler} />
        </>
      )}
    </div>
  );
}
