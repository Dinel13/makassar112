import { useState } from "react";
import BuatKategori from "../../components/phonebook/admin/BuatKategori";
import BuatWilayah from "../../components/phonebook/admin/BuatWilayah";

export default function Phonebook() {
  const [buatKategori, setBuatKategori] = useState(false);
  const [buatWilayah, setBuatWilayah] = useState(false);
  const [buatPB, setPB] = useState(false);
  const [updatePB, setUpdatePB] = useState(false);

  return (
    <div>
      {buatKategori && (
        <BuatKategori cancel={() => setBuatKategori(!buatKategori)} />
      )}
      <button
        className="text-indigo-500 text-sm"
        onClick={() => setBuatKategori(!buatKategori)}
      >
        buat kategori baru
      </button>
      {buatWilayah && (
        <BuatWilayah cancel={() => setBuatWilayah(!buatWilayah)} />
      )}
      <button
        className="text-indigo-500 text-sm"
        onClick={() => setBuatWilayah(!buatWilayah)}
      >
        buat wilayah baru
      </button>
    </div>
  );
}
