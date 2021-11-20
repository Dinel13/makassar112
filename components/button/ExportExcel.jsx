import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

const exportToExcel = (apiData, fileName) => {
  const ws = XLSX.utils.json_to_sheet(apiData);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};

export default function ExportExcel({data}) {
  return (
    <button
      onClick={() => exportToExcel(data, "Laporan")}
      className="btn-pri py-1.5 text-sm px-5 tracking-wider"
    >
      Excel
    </button>
  );
}
