import { db } from "../../../lib/db";
import { getSession } from "next-auth/client";

async function deleteData(id) {
  try {
    await db.query(`DELETE FROM hglusers WHERE id = $1`, [id]);
  } catch (error) {
    console.log(error);
  }
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

  async function run() {
    try {
      const body = JSON.parse(req.body);
      const { kategori, deskripsi, lokasi } = body;

      if (!kategori || !deskripsi || !lokasi) {
        return res.status(422).send({
          error: "isian tidak lengkap",
        });
      }

      const newData = await db.one(
        `INSERT INTO hglusers(kategori, deskripsi, lokasi)
        VALUES($1, $2, $3) RETURNING *`,
        [kategori, deskripsi, lokasi]
      );

      if (newData) {
        setTimeout(() => {
          deleteData(newData.id);
        }, 24 * 60 * 60 * 1000); // 1 hari
      }

      res.status(200).json(newData);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error creating on the server", error: error });
    }
  }
  run();
}
