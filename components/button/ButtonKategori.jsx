import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotif } from "../../store/notifSlice";

export default function ButtonKategori({ children, text, setStatus, resultRef }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // fetch when submit
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
        `${process.env.NEXT_PUBLIC_URL}/phonebook/user/kategori`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify({
            kategori: text.toLowerCase(),
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
      resultRef.current.scrollIntoView({ behavior: "smooth" });
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
    <div className="p-4 ">
      <button
        onClick={submitHandler}
        className="flex items-center px-6 py-4 justify-center shadow rounded-xl dark-card link-scale"
      >
        {children}
        <span className="ml-3">{text}</span>
      </button>
    </div>
  );
}
