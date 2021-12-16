import jsPDF from "jspdf";
import "jspdf-autotable";

export default function ExportPDFF({ data, name }) {
  const doc = new jsPDF("l", "mm", [297, 210]);

  // Or use javascript directly:
  console.error = () => {}; // to hide error messages from console
  doc.autoTable({
    theme: "grid",
    styles: {
      fontSize: 8,
      halign: "center",
    },
    margin: { top: 10, right: 5, bottom: 10, left: 5 },
    headStyles: {
      fillColor: [1, 1, 1],
    },
    bodyStyles: {
      cellPadding: 1,
      fontSize: 7,
    },
    columnStyles: {
      id: {cellWidth: 7 },
      id_laporan: {cellWidth: 16 },
      kategori: {cellWidth: 18 },
      deskripsi: {cellWidth: 50 },
      lokasi: {cellWidth: 34 },
      kecamatan: {cellWidth: 16 },
      kelurahan: {cellWidth: 16 },
      catatan: {cellWidth: 30 },
      created_at: {cellWidth: 23 },
      pelapor: {cellWidth: 15 },
      telp: {cellWidth: 18 },
      tipe: {cellWidth: 12 },
      agen1: {cellWidth: 16 },
      dinas: {cellWidth: 15 },
    }, 
    body: data,
    columns: [
      { dataKey: "id", header: "ID" },
      { dataKey: "id_laporan", header: "ID Laporan" },
      { dataKey: "kategori", header: "Kategori" },
      { dataKey: "deskripsi", header: "Deskripsi Kejadian" },
      { dataKey: "lokasi", header: "Lokasi Kejadian" },
      { dataKey: "kecamatan", header: "Kecamatan" },
      { dataKey: "kelurahan", header: "Kelurahan" },
      { dataKey: "catatan", header: "Catatan" },
      { dataKey: "created_at", header: "Waktu Lapor" },
      { dataKey: "pelapor", header: "Nama Pelapor " },
      { dataKey: "telp", header: "No. Telp " },
      { dataKey: "tipe", header: "Tipe Panggilan" },
      { dataKey: "agen1", header: "Agen L1" },
      { dataKey: "dinas", header: "Dinas Terkait" },
    ],
  });

  const save = () => {
    doc.save(name + ".pdf");
  };

  return <button  className="btn-pri py-1.5 text-sm px-5 tracking-wider" onClick={save}>PDF</button>;
}
