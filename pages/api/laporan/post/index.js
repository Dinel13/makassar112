const path = require("path");
import getConfig from "next/config";
import { getSession } from "next-auth/client";
import nextConnect from "next-connect";
const readXlsxFile = require("read-excel-file/node");

import { db } from "../../../../lib/db";
import { excelUpload } from "../../../../lib/excelUpload";
import { resolve } from "path";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

async function auth(req, res, next) {
  const session = await getSession({ req });
  if (!session) {
    res.status(200).json({
      message: "You must signin.",
    });
  }
  next();
}

apiRoute.use(auth, excelUpload.single("file"));

function ttt(dd) {
  return new Promise(async (resolve, reject) => {
    const allData = [];
    for (let i = 0; i < dd.length; i++) {
      const data = dd[i];
      try {
        const insertData = await db.query(
          `INSERT INTO laporans(id_laporan, kategori, deskripsi, lokasi, kecamatan, kelurahan,
        catatan, created_at, status, updated_at, pelapor, telp, channel, tipe, agen1, agen2, agen3,  lat, long,
        sub1, sub2, sub3, dinas, catatanl2, catatanl3)
      VALUES($1, $2, $3, $4, $5, $6, $7, TO_TIMESTAMP($8, 'DD-MM-YYYY HH24:MI:SS'), $9, TO_TIMESTAMP($10, 'DD-MM-YYYY HH24:MI:SS'), $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25)
      RETURNING *`,
          [
            data[1],
            data[2],
            data[3],
            data[4],
            data[5],
            data[6],
            data[7],
            data[8],
            data[9],
            data[10],
            data[11],
            data[12],
            data[13],
            data[14],
            data[15],
            data[16],
            data[17],
            data[18],
            data[19],
            data[20],
            data[21],
            data[22],
            data[23],
            data[24],
            data[25],
          ]
        );
        if (insertData && insertData[0]) {
          allData.push(insertData[0]);
        }
      } catch (error) {
        if (error.code === "23505") {
          try {
            const id = error.detail.split("(id_laporan)=(")[1].split(") ")[0];
            // try to update the data by id_laporan
            const updateData = await db.query(
              `UPDATE laporans SET status = $1, updated_at = TO_TIMESTAMP($2, 'DD-MM-YYYY HH24:MI:SS')
              WHERE id_laporan = $3 AND status != $1 RETURNING *`,
              [data[9], data[10], id]
            );
            if (updateData && updateData[0]) {
              allData.push(updateData[0]);
            }
          } catch (error) {
            continue;
          }
          continue;
        }
        reject(error);
      }
    }
    resolve(allData);
  });
}

apiRoute.post(async (req, res) => {
  const rows = await readXlsxFile(
    path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, "/upload/file.xlsx")
  );
  rows.shift();
  const result = await ttt(rows);
  if (result.length == 0) {
    res.status(200).json({
      message: "Data sudah yang terbaru",
    });
  } else {
    res.status(201).json({ data: result });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
