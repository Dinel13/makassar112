const path = require("path");
const fs = require("fs");

const puppeteer = require("puppeteer");
import getConfig from "next/config";
import { getSession } from "next-auth/client";

const readXlsxFile = require("read-excel-file/node");

import { db } from "../../../lib/db";

function saveToDB(dd) {
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

// getFileName get file name inside directories
function getFileName(dir) {
  const files = fs.readdirSync(dir);
  return files[files.length - 1];
}

// removeFile remove file
function removeFile(fileName) {
  fs.unlinkSync(path.join(fileName));
}

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(200).json({
      message: "You must signin.",
    });
  }

  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  const basedir = getConfig().serverRuntimeConfig.PROJECT_ROOT;
  const fileDir = path.join(basedir, "report");
  let fileName;

  async function run() {
    try {
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.goto("https://makassar.sakti112.id/login", {
        waitUntil: "load",
        timeout: 0,
      });
      await page.type("#email", "spvmakassar@sakti112.id");
      await page.type("#password", "spv12345");
      await page.click(".btnColor");
      await page.waitForTimeout(2500);
      await page.goto(
        "https://makassar.sakti112.id/dashboard/112/call/report",
        {
          waitUntil: "load",
          timeout: 0,
        }
      );
      await page._client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath: fileDir,
      });
      await page.waitForTimeout(3500);
      // await page.select('#cbinteraksi', '1')
      await page.click(".btn-report-excel");
      await page.waitForTimeout(2500);
      await browser.close();

      fileName = getFileName(fileDir);
      const fullPath = path.join(fileDir, fileName);
      const rows = await readXlsxFile(fullPath);
      rows.shift();
      const result = await saveToDB(rows);
      if (result.length == 0) {
        res.status(200).json({
          message: "Data sudah yang terbaru",
        });
      } else {
        res.status(201).json({ data: "ok" });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error creating on the server", error: error });
    } finally {
      removeFile(path.join(basedir, "/report", fileName));
    }
  }
  run();
}
