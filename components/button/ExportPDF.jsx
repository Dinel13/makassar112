import printJS from "print-js";

export default function ExportPDF({ data }) {
  return (
    <button
      type="button"
      onClick={() =>
        printJS({
          printable: data,
          header: "Laporan makassar 112",
          // properties: [
          //   { field: 'name', displayName: 'Full Name'},
          properties: [
            "id",
            "kategori",
            "deskripsi",
            "alamat",
            "lokasi",
            "update_at",
            "status",
          ],
          type: "json",
          gridHeaderStyle:
            "background-color: gray;  border: 2px solid #3971A5;",
          gridStyle: "border: 2px solid #3971A5;",
          font_size: "10",
        })
      }
      className="btn-pri py-1.5 text-sm px-5 tracking-wider"
    >
      PDF
    </button>
  );
}
