import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotif } from "../../../store/notifSlice";
import Pagination from "../../button/Pagination";
import Item from "./ItemForAdmin";

export default function PhoneBookList({ onUpdate, needRefh, needRefsh }) {
  const [data, setData] = useState(null);
  const [total, setTotal] = useState({ loading: true, data: 0 });
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const removeItem = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  const getData = useCallback(
    async (page) => {
      try {
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/phonebook/all-admin/${page}`,
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
  }, [page, getData, needRefh, needRefsh]);
  // refresh jika item dihapus
  // needRefh jika item ditmabhag
  // needRefsh jika item diupdate

  const getTotal = useCallback(async () => {
    setTotal((s) => ({ ...s, loading: true }));
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/phonebook/total`,
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
  }, [dispatch]);

  useEffect(() => {
    getTotal();
  }, [getTotal]);

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
      <h2 className="text-title mb-3 text-center">Semua Data Phone Book</h2>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className=" shadow overflow-hidden border-b border-gray-600 sm:rounded-lg dark-card">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-opacity-70">
                <tr>
                  <th
                    scope="col"
                    className=" px-6  py-4 text-center text-xs font-medium uppercase tracking-wider "
                  >
                    Nama Kontak
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider  "
                  >
                    Nomor Kontak
                  </th>
                  <th
                    scope="col"
                    className="  px-6  py-3  text-center text-xs  font-medium    uppercase  tracking-wider "
                  >
                    Kategori
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider"
                  >
                    Wilayah
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider"
                  >
                    Lokasi
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider"
                  >
                    Sifat
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider"
                  >
                    Update Terakhir
                  </th>
                  <th
                    scope="col"
                    className=" px-6 py-3 text-center text-xs font-medium  uppercase tracking-wider"
                  >
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {data &&
                  data.length > 0 &&
                  data.map((item) => (
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
        </div>
      </div>
      {data && !total.loading && (
        <Pagination page={page} lanjut={nextHandler} belum={prevHandler} />
      )}
    </div>
  );
}
