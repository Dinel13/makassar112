import React from "react";

export default function ItemForAdmin() {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium ">Nida Povey</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">CMO, Marketing</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm ">nida.povey@example.com</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm ">Admin</td>
      <td className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit
        </a>
      </td>
    </tr>
  );
}
