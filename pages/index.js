import Head from "next/head";
import Image from "next/image";
import { useRef, useState } from "react";
import Loading from "../components/loading/Loading";
import Hasil from "../components/phonebook/Hasil";
import Sering from "../components/phonebook/Sering";

import { kategori, wilayah } from "../data";

export default function Home() {
  const kategoriRef = useRef(null);
  const wilayahRef = useRef(null);
  const [kategoriSelect, setKategoriSelect] = useState(kategori);
  const [wilayahSelect, setWilayahSelect] = useState(wilayah);
  const [kategoriData, setKategoriData] = useState(null);
  const [wilayahData, setWilayahData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasil, setHasil] = useState(null);
  const [everSeach, setEverSearch] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
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
    <>
      <div
        className="w-full bg-center bg-cover h-128"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80)",
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl text-white font-semibold  uppercase lg:text-3xl">
              Layanan Informasi <span className="text-blue-400">Publik</span>
            </h1>
            <form
              onSubmit={submitHandler}
              className="dark-card mt-4 flex py-3 px-4 max-w-md mx-auto border-2 border-gray-600 rounded-full"
            >
              <div className="grid grid-cols-2 divide-x divide-gray-400">
                <label className="">
                  <select
                    ref={kategoriRef}
                    className="dark-nav bg-transparent focus:outline-none rounded-xl text-sm py-2 px-3 w-40"
                  >
                    <option value="">Kategori {"   "}</option>
                    {kategoriSelect.map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="px-3">
                  <select
                    ref={wilayahRef}
                    className="dark-nav bg-transparent focus:outline-none rounded-xl text-sm  py-2 px-3 w-40"
                  >
                    <option value="">Wilayah {"   "}</option>
                    {wilayahSelect.map((item) => (
                      <option key={item.id} value={item.id}>
                        {" "}
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                className="btn-sec ml-2.5 px-4 rounded-full"
                type="submit"
              >
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
          </div>
        </div>
      </div>
      <div className="container m-0 mx-auto px-1 sm:px-2 md:px-3 lg:px-5 xl:px-7 2xl:px-9 py-2 sm:py-4 md:py-7 lg:py-10 xl:py-12 2xl:py-14">
        {hasil && !loading && (
          <div className="mb-16">
            <Hasil />
          </div>
        )}
        {loading && (
          <div className="mb-16">
            <h2 className="text-title mb-3 text-center">Hasil Pencarian</h2>{" "}
            <Loading />{" "}
          </div>
        )}
        {!hasil && !loading && everSeach && (
          <div className="mb-16 text-center">
            <h2 className="text-title mb-3 ">Hasil Pencarian</h2>
            <h className="text-subtitle my-10 font-normal">
              Tidak ada hasil
            </h>
            <p>Pebaiki keyword pencarian kamu</p>
          </div>
        )}
        <Sering />
      </div>
    </>
  );
}
