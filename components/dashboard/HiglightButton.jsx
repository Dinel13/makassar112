import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotif } from "../../store/notifSlice";
import { makeRefresh } from "../../store/rfSlice";

import PendingButton from "../button/Pending";

export default function HiglightButton(data) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const highlight = async () => {
    setLoading(true);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/highlight`,
        // `${process.env.NEXT_PUBLIC_URL}/laporan`,
        {
          method: "POST",
          headers: {
            // "Authorization" : "Bearer dasdh@32f30@$ad7980GG@#tt!09fda&d^d%adada#das970"
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
      dispatch(makeRefresh());
      dispatch(
        showNotif({
          status: "Berhasil",
          message: "Data berhasil ditambahkan",
          action: null,
        })
      );
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

export function UnHiglightButton(dataId) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const unhighlight = async () => {
    setLoading(true);
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/laporan/highlight/${dataId}`,
        {
          method: "DELETE",
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa menghapus data");
      }
      setLoading(false);
      dispatch(makeRefresh({needRefresh: true}));
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
        onClick={() => unhighlight()}
        className="break py-1 px-2 rounded btn-pri min"
      >
        Hapus
      </button>
    );
  }
}
