import { getSession } from "next-auth/client";
import {useRouter }from "next/router";
import { useEffect, useState, useRef } from "react";

import { kategori, wilayah } from "../../data";
import ListLaporan from "../../components/laporan/List";

export default function Laporan() {
  const [isLoading, setIsLoading] = useState(true); // for session
  const router = useRouter();
  const kategoriRef = useRef(null);
  const wilayahRef = useRef(null);
  const searchRef = useRef(null);
  const [everSeach, setEverSearch] = useState(false);
  const [kategoriSelect, setKategoriSelect] = useState(kategori);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push("/masuk");
      }
      setIsLoading(false);
    });
  }, [router]);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setEverSearch(true);
    console.log(kategoriRef.current.value);
    console.log(wilayahRef.current.value);
    console.log("submit");
    try {
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h3 className="text-title font-medium">Laporan</h3>
      <form
        onSubmit={submitHandler}
        className="dark-card flex py-2 px-3 max-w-md mt-3 border-2 border-gray-600 rounded-xl"
      >
        <div className="grid grid-cols-2 divide-x divide-gray-400">
          <label className="">
            <select
              ref={kategoriRef}
              className="dark-nav bg-transparent focus:outline-none rounded-xl text-sm py-2 px-3 w-40"
            >
              <option value="">Kategori</option>
              {kategoriSelect.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nama}
                </option>
              ))}
            </select>
          </label>
          <label className="px-3">
        <input
                ref={searchRef}
                type="text"
                placeholder="Cari"
                required
                maxLength="50"
                className="dark-nav bg-transparent focus:outline-none rounded-xl py-2 px-3 w-40"
              ></input>
          </label>
        </div>
        <button className="btn-pri ml-2.5 px-4 rounded-full" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </form>
     
      <ListLaporan />
    </div>
  );
}
