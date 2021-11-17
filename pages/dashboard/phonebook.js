import { useState } from "react";
import BuatKategori from "../../components/phonebook/admin/BuatKategori";

export default function Phonebook() {
  const [isEditPhoto, setIsEditPhoto] = useState(false);

  return (
    <div>
      {isEditPhoto && <BuatKategori cancel={() => setIsEditPhoto(!isEditPhoto)} />}
      <button
        className="text-indigo-500 text-sm"
        onClick={() => setIsEditPhoto(!isEditPhoto)}
      >
        buat kategori baru
      </button>
    </div>
  );
}
