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
      const { nama, phone, kategori, wilayah, alamat, lokasi, status } = body;

      if (
        !nama ||
        !phone ||
        !kategori ||
        !wilayah ||
        !alamat ||
        !lokasi ||
        !status
      ) {
        return res.status(422).send({
          error: ["Isian tidak lengkap"],
        });
      }

      const newPhone = await db.one(
        `INSERT INTO phones(nama, phone, kategori, wilayah, alamat, lokasi, status )
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [nama, phone, kategori, wilayah, alamat, lokasi, status]
      );

      res.status(200).json(newPhone);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
