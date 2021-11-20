import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import { kategori } from "../../data";
import { showNotif } from "../../store/notifSlice";
import PendingButton from "../button/Pending";

export default function Search({ setStatus }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const kategoriRef = useRef(null);
  const [kategoriSelect, setKategoriSelect] = useState(kategori);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({
      loading: true,
      hasil: null,
      search: true,
    });
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/search`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kategori: kategoriRef.current.value.toLowerCase(),
            startDate: startDate,
            endDate: endDate,
          }),
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa mencari");
      }
      setLoading(false);
      setStatus({
        loading: false,
        hasil: data,
        search: true,
      });
      // resultRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      setLoading(false);
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
    <form
      onSubmit={submitHandler}
      className="dark-card inline-flex flex-wrap items-center justify-start py-2 px-3 gap-x-4 gap-y-2 mt-3 border-2 border-gray-600 rounded-xl"
    >

      <label className="flex items-center">
        <span>Kategori</span>
        <select
          ref={kategoriRef}
          required
          className="dark-main focus:outline-none rounded-xl text-sm py-4 px-2 ml-2 w-44"
          placeholder="Kategori"
        >
          <option value=""></option>
          {kategoriSelect.map((item) => (
            <option key={item.id} value={item.name}>
              {item.nama}
            </option>
          ))}
        </select>
      </label>

     <div className="flex flex-wrap items-center gap-x-4 gap-y-2 "> <label className="flex items-center">
        <span>Waktu</span>
        {/* // for range date */}
        <div className="flex dark-main gap-x-2 items-center rounded-xl ml-2">
          <div className="bg-transparent focus:outline-none rounded-xl py-2 px-3 w-32 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="pl-7 bg-transparent text-sm focus:outline-none py-2 px-3"
              selectsStart
              startDate={startDate}
              endDate={endDate}
              //  isClearable
              placeholderText="Awal"
            ></DatePicker>
          </div>
          -
          <div className=" bg-transparent focus:outline-none rounded-xl py-2 px-3 w-32 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <DatePicker
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              className="pl-7 bg-transparent text-sm  focus:outline-none py-2 px-3"
              endDate={endDate}
              minDate={startDate}
              //  isClearable
              placeholderText="Akhir"
            />
          </div>
        </div>
      </label>
      {loading ? (
        <PendingButton />
      ) : (
        <button className="btn-pri py-3 px-4 rounded-full z-10" type="submit">
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
      )}
      </div>
    </form>
  );
}