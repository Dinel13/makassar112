import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import FloatingWhatsApp from "react-floating-whatsapp";

import ButtonKategori from "../components/button/ButtonKategori";
import Loading from "../components/loading/Loading";
import Hasil from "../components/phonebook/Hasil";
import { showNotif } from "../store/notifSlice";
import MarqueLaporan from "../components/MarqueLaporan";

export default function Home() {
  const searchRef = useRef(null);
  const resultRef = useRef(null);
  const dispatch = useDispatch();
  const [statusData, setStatus] = useState({});

  // set light mode as default if this page is render
  if (typeof window !== "undefined") {
    if (localStorage.getItem("mode") === null) {
      localStorage.setItem("mode", "light");
    }
  }

  useEffect(() => {
    localStorage.theme = "light";
    document.documentElement.classList.add("dark");
    localStorage.theme = "light";
  }, []);

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
            <form
              onSubmit={submitHandler}
              className="dark-card mt-2 sm:mt-0 flex justify-between items-center py-1 pl-3 pr-1.5 max-w-sm border border-gray-500 rounded-full"
            >
              <label className="">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Cari"
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
      <MarqueLaporan />
      <div className="container m-0 mx-auto px-1 sm:px-2 md:px-3 lg:px-5 xl:px-7 2xl:px-9 py-2 sm:py-4 md:py-7 lg:py-10 xl:py-12 2xl:py-14">
        <div className="my-6">
          <h2 className="text-title">Pilih Kategori</h2>
          <div className="my-3">
            <div className="flex flex-wrap -mx-4">
              <ButtonKategori
                text="Kesehatan"
                setStatus={setStatus}
                resultRef={resultRef}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  aria-hidden="true"
                  role="img"
                  width="3em"
                  height="3em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 16H4V8h16v12z"
                    fill="currentColor"
                  />
                  <path
                    d="M13 10h-2v3H8v2h3v3h2v-3h3v-2h-3z"
                    fill="currentColor"
                  />
                </svg>
              </ButtonKategori>
              <ButtonKategori
                text="Lingkungan"
                setStatus={setStatus}
                resultRef={resultRef}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  aria-hidden="true"
                  role="img"
                  width="3em"
                  height="3em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41c0 2.08-.8 3.97-2.1 5.39z"
                    fill="currentColor"
                  />
                </svg>
              </ButtonKategori>
              <ButtonKategori
                className="text-title"
                text="Keamanan"
                setStatus={setStatus}
                resultRef={resultRef}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  aria-hidden="true"
                  role="img"
                  width="3em"
                  height="3em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M14.5 12.59l.9 3.88l-3.4-2.05l-3.4 2.05l.9-3.87l-3-2.59l3.96-.34L12 6.02l1.54 3.64l3.96.34l-3 2.59zM12 3.19l7 3.11V11c0 4.52-2.98 8.69-7 9.93c-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4z"
                    fill="currentColor"
                  />
                </svg>
              </ButtonKategori>
            </div>
          </div>
        </div>
        <div ref={resultRef}>
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
                <h4 className="text-subtitle my-10 font-normal">
                  Tidak ada hasil
                </h4>
                <p>Pebaiki keyword pencarian kamu</p>
              </div>
            )}
          {statusData.loading && (
            <div className="mb-16">
              <h2 className="text-title mb-3 text-center">Hasil Pencarian</h2>{" "}
              <Loading />{" "}
            </div>
          )}
        </div>
      </div>
      <div className="App">
        <FloatingWhatsApp
          phoneNumber="+62 823-4646-2435"
          accountName="112"
          darkMode="true"
          allowClickAway
          notification
          notificationDelay={60000} // 1 minute
          notificationSound
          placeholder="Laporkan kejadian anda"
          chatMessage="112 Kota Makassar Ada yang bisa kami bantu?"
        />
      </div>
    </>
  );
}
