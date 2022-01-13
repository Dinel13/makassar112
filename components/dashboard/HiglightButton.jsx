import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotif } from "../../store/notifSlice";
import { makeRefresh, makeRFHglUser } from "../../store/rfSlice";

import PendingButton from "../button/Pending";
import EditHiglight from "./EditHiglight";

export default function HiglightButton(data) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const highlight = async () => {
    setLoading(true);
    try {
      const result = await fetch(
        `../api/laporan/highlight`,
        {
          method: "POST",
          body: JSON.stringify({
            id_laporan: data.id_laporan,
          }),
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
        `../api/laporan/highlight/${dataId}`,
        {
          method: "DELETE",
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa menghapus data");
      }
      setLoading(false);
      dispatch(makeRefresh({ needRefresh: true }));
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

export function HiglightUser(row) {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const hapus = async (id) => {
    setLoading(true);
    try {
      const result = await fetch(
        `../api/highlight/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await result.json();
      if (!result.ok) {
        throw new Error(data.error || "Tidak bisa menghapus data");
      }
      dispatch(makeRFHglUser());
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
      <>
        {edit && <EditHiglight data={row} cancel={() => setEdit(false)} />}
        <div className="flex gap-x-1">
          <button
            onClick={() => hapus(row.id)}
            className="break py-1 px-1.5 rounded btn-ter text-xs"
          >
            Hapus
          </button>

          <button
            onClick={() => setEdit(true)}
            className="break py-1 px-1.5 rounded btn-pri text-xs"
          >
            Update
          </button>
        </div>
      </>
    );
  }
}
