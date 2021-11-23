import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotif } from "../../store/notifSlice";

import PendingButton from "../button/Pending";

export default function HiglightButton(data) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(data);

  const highlight = async () => {
    setLoading(true);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/highlight`,
        {
          method: "POST",
          headers: {
            // "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const dataJson = await result.json();
      if (!result.ok) {
        throw new Error(dataJson.error || "Tidak bisa menyimpan data");
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
        onClick={() => highlight()}
        className="break py-1 px-2 rounded btn-pri min"
      >
        Higlight
      </button>
    );
  }
}

export function UnHiglightButton({ dataId }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const unhighlight = async (id) => {
    setLoading(true);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/unhightlight`,
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
        onClick={() => unhighlight(dataId)}
        className="break py-1 px-2 rounded btn-pri min"
      >
        Hapus
      </button>
    );
  }
}