import Image from "next/image";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import ButtonKategori from "../components/button/ButtonKategori";
import Loading from "../components/loading/Loading";
import Hasil from "../components/phonebook/Hasil";
import Sering from "../components/phonebook/Sering";
import { showNotif } from "../store/notifSlice";

import { kategori, wilayah } from "../data";

export default function Home() {
  // const kategoriRef = useRef(null);
  // const wilayahRef = useRef(null);
  // const [kategoriSelect, setKategoriSelect] = useState(kategori);
  // const [wilayahSelect, setWilayahSelect] = useState(wilayah);
  // const [kategoriData, setKategoriData] = useState(null);
  // const [wilayahData, setWilayahData] = useState(null);
  const searchRef = useRef(null);
  const resultRef = useRef(null);
  const dispatch = useDispatch();
  const [statusData, setStatus] = useState({});

  const submitHandler = async (e) => {
    e.preventDefault();
    setStatus({
      loading: true,
      hasil: null,
      search: true,
    });
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/phonebook/user/search`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: searchRef.current.value,
          }),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa mencari");
      }
      setStatus({
        loading: false,
        hasil: data,
        search: true,
      });
      searchRef.current.value = "";
      resultRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setStatus({
        loading: false,
        hasil: null,
        search: true,
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

  return (
    <>
      <div
        className="w-full bg-center bg-cover  h-128"
        style={{
          backgroundImage: "url(/bgg.jpg)",
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/kominfo.png"
              alt="logo kominfo"
              width="180"
              height="170"
            />
            <h1 className="text-title my-4 text-white font-semibold  uppercase lg:text-3xl">
              Layanan Informasi <span className="text-blue-400">Publik</span>
            </h1>
            {/* <form
              onSubmit={submitHandler}
              className="dark-card flex py-2 px-3 max-w-md mx-auto border-2 border-gray-600 rounded-full"
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
                  <select
                    ref={wilayahRef}
                    className="dark-nav bg-transparent focus:outline-none rounded-xl text-sm  py-2 px-3 w-40"
                  >
                    <option value="">Wilayah</option>
                    {wilayahSelect.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nama}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                className="btn-pri ml-2.5 px-4 rounded-full"
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
            </form> */}
            <form
              onSubmit={submitHandler}
              className="dark-card mt-2 sm:mt-0 flex justify-between items-center py-1 pl-3 pr-1.5 max-w-sm border border-gray-500 rounded-full"
            >
              <label className="">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Wilayah"
                  required
                  maxLength="50"
                  className="dark-nav bg-transparent focus:outline-none rounded-xl py-2 px-3 max-w-lg"
                ></input>
              </label>
              <button
                className="btn-pri ml-2.5 py-2.5 px-3 rounded-full"
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
        <h2 className="text-title">Pilih Kategori</h2>
        <div className="mt-3">
          <div className="flex flex-wrap -mx-4">
            <ButtonKategori
              text="Kesehatan"
              onClick={() => window.alert("dasd")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </ButtonKategori>
          </div>
        </div>
        {/* <div ref={resultRef}> */}
        {statusData.hasil &&
          statusData.hasil.length > 0 &&
          !statusData.loading && (
            <div className="mb-16">
              <Hasil data={statusData.hasil} />
            </div>
          )}
        {statusData.hasil &&
          statusData.hasil.length == 0 &&
          !statusData.loading &&
          statusData.search && (
            <div className="mb-16 text-center">
              <h2 className="text-title mb-3 ">Hasil Pencarian</h2>
              <h className="text-subtitle my-10 font-normal">Tidak ada hasil</h>
              <p>Pebaiki keyword pencarian kamu</p>
            </div>
          )}
        {statusData.loading && (
          <div className="mb-16">
            <h2 className="text-title mb-3 text-center">Hasil Pencarian</h2>{" "}
            <Loading />{" "}
          </div>
        )}
        {/* </div> */}
        {/* <Sering /> */}
      </div>
    </>
  );
}
