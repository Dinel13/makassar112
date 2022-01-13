import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotif } from "../../store/notifSlice";
import PendingInline from "../button/PendingInline";

export default function SearchName({ setStatus, setKeyword }) {
  const searchRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
        `api/laporan/searchByName`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search: searchRef.current.value,
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
      setKeyword([{ key: "Keyword", value: searchRef.current.value }]);
      if (data) {
        searchRef.current.value = "";
      }
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="dark-card flex justify-between items-center py-1 pl-3 pr-1.5 max-w-sm rounded-xl"
    >
      <label className="">
        <input
          ref={searchRef}
          type="text"
          placeholder="Cari"
          required
          maxLength="50"
          className="dark-nav bg-transparent focus:outline-none rounded-xl py-2 px-3 w-40"
        ></input>
      </label>
      {loading ? (
        <PendingInline />
      ) : (
        <button className="btn-sec py-2 px-3 mr-1" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
    </form>
  );
}
