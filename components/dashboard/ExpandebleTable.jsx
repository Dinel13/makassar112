import React from "react";

export default function ExpandebleTable({ data }) {
  return (
    <table className="table-fixed mt-2 mb-4 mx-4 text-xs border-b">
      <tbody className="divide-y divide-gray-200">
        <tr className="w-auto">
          <td className="w-36 font-semibold">No. Telphone</td>
          <td className="p-2">{data.telp}</td>
        </tr>
        <tr>
          <td className="w-36 font-semibold">Catatan </td>
          <td className="p-2">{data.catatan}</td>
        </tr>
        <tr>
          <td className="w-36 font-semibold">Status</td>
          <td className="p-2">{data.status}</td>
        </tr>
        <tr>
          <td className="w-36 font-semibold">Tipe</td>
          <td className="p-2">{data.tipe}</td>
        </tr>
        <tr>
          <td className="w-36 font-semibold">Agen L1</td>
          <td className="p-2">{data.agen}</td>
        </tr>
        <tr>
          <td className="w-36 font-semibold">Dinas terkait</td>
          <td className="p-2">{data.dinas}</td>
        </tr>
      </tbody>
    </table>
  );
}
