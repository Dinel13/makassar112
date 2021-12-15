import { db } from "../../../lib/db";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(200).json({
      message: "You must sign in.",
    });
  }

  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  async function run() {
    try {
      const body = JSON.parse(req.body);
      const { kategori, kecamatan, kelurahan, startDate, endDate } = body;

      if (!kategori || !kecamatan || !kelurahan || !startDate || !endDate) {
        return res.status(422).send({
          error: "isian tidak lengkap",
        });
      }

      // semua kosong
      if (
        kategori === "semua" &&
        kecamatan === "semua" &&
        kelurahan === "semua"
      ) {
        const total = await db.query(
          "SELECT * FROM laporans WHERE updated_at BETWEEN $1 AND $2",
          [startDate, endDate]
        );
        res.status(200).json(total);

        return;
      } else if (
        // kecamatan ada
        kategori === "semua" &&
        kecamatan !== "semua" &&
        kelurahan === "semua"
      ) {
        const total = await db.query(
          "SELECT * FROM laporans WHERE kecamatan = $1 AND updated_at BETWEEN $2 AND $3",
          [kecamatan, startDate, endDate]
        );
        res.status(200).json(total);

        return;
      } else if (
        // kecamatan dan kelurahan ada
        kategori === "semua" &&
        kecamatan !== "semua" &&
        kelurahan !== "semua"
      ) {
        const total = await db.query(
          "SELECT * FROM laporans WHERE kecamatan = $1 AND kelurahan = $2 AND updated_at BETWEEN $3 AND $4",
          [kecamatan, kelurahan, startDate, endDate]
        );
        res.status(200).json(total);

        return;
      } else if (
        // hanya kategori ada
        kategori !== "semua" &&
        kecamatan === "semua" &&
        kelurahan === "semua"
      ) {
        const total = await db.query(
          "SELECT * FROM laporans WHERE LOWER(kategori) = LOWER($1) AND updated_at BETWEEN $2 AND $3",
          [kategori, startDate, endDate]
        );
        res.status(200).json(total);

        return;
      } else if (
        // hanya kategori dan kecamatan ada
        kategori !== "semua" &&
        kecamatan !== "semua" &&
        kelurahan === "semua"
      ) {
        const total = await db.query(
          "SELECT * FROM laporans WHERE LOWER(kategori) = LOWER($1) AND kecamatan = $2 AND updated_at BETWEEN $3 AND $4",
          [kategori, kecamatan, startDate, endDate]
        );
        res.status(200).json(total);

        return;
      } else {
        // semua ada
        const resultSearch = await db.query(
          `SELECT * FROM laporans WHERE LOWER(kategori) = LOWER($1) 
        AND kecamatan = $2 AND kelurahan = $3 AND updated_at BETWEEN $4 AND $5`,
          [kategori, kecamatan, kelurahan, startDate, endDate]
        );

        res.status(200).json(resultSearch);
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
