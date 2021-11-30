import React from "react";
import { parseDateSQLtoString } from "../../lib/time";

export default function ExpandebleTable({ data }) {
  return (
    <table className="table-fixed mb-4 text-xs border-b border-gray-300 dark:border-gray-400">
      <tbody className="divide-y divide-gray-300 dark:divide-gray-400">
        <tr>
          <td className="w-36 pl-3 font-medium">Catatan</td>
          <td className="p-2">{data.catatan}</td>
        </tr>
        <tr>
          <td className="w-36 pl-3 font-medium">Status</td>
          <td className="p-2">{data.status}</td>
        </tr>
        <tr>
          <td className="w-36 pl-3 font-medium">Status Time</td>
          <td className="p-2">{parseDateSQLtoString(data.updated_at)}</td>
        </tr>
        <tr>
          <td className="w-36 pl-3  font-medium">Channel</td>
          <td className="p-2">{data.channel}</td>
        </tr>
        <tr>
          <td className="w-36 pl-3  font-medium">Tipe Panggilan</td>
          <td className="p-2">{data.tipe}</td>
        </tr>
        <tr>
          <td className="w-36 pl-3  font-medium">Agen L1</td>
          <td className="p-2">{data.agen1}</td>
        </tr>
        {data.agen2 !== "-" && (
          <tr>
            <td className="w-36 pl-3 font-medium">Agen L2</td>
            <td className="p-2">{data.agen2}</td>
          </tr>
        )}
        {data.agen3 !== "-" && (
          <tr>
            <td className="w-36 pl-3 font-medium">Agen L3</td>
            <td className="p-2">{data.agen3}</td>
          </tr>
        )}
        {data.lat !== "0" && (
          <tr>
            <td className="w-36 pl-3 font-medium">Lat</td>
            <td className="p-2">{data.lat}</td>
          </tr>
        )}
        {data.long !== "0" && (
          <tr>
            <td className="w-36 pl-3 font-medium">Long</td>
            <td className="p-2">{data.long}</td>
          </tr>
        )}
        {data.sub1 !== "-" && (
          <tr>
            <td className="w-36 pl-3 font-medium">SubCategory 1</td>
            <td className="p-2">{data.sub1}</td>
          </tr>
        )}
        {data.sub2 !== "-" && (
          <tr>
            <td className="w-36 pl-3 font-medium">SubCategory 2</td>
            <td className="p-2">{data.sub2}</td>
          </tr>
        )}
        {data.sub3 !== "-" && (
          <tr>
            <td className="w-36 pl-3  font-medium">SubCategory 3</td>
            <td className="p-2">{data.sub3}</td>
          </tr>
        )}
        <tr>
          <td className="w-36 pl-3 font-medium">Dinas terkait</td>
          <td className="p-2">{data.dinas}</td>
        </tr>
        {data.catatanl2 && (
          <tr>
            <td className="w-36 pl-3 font-medium">Catatan L2</td>
            <td className="p-2">{data.catatanl2}</td>
          </tr>
        )}
        {data.catatanl3 && (
          <tr>
            <td className="w-36 pl-3 font-medium">Catatan L3</td>
            <td className="p-2">{data.catatanl3}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
