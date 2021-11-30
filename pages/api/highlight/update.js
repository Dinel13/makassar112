import { db } from "../../../lib/db";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(200).json({
      message: "You must signin.",
    });
  }

  if (req.method !== "PUT") {
    res.status(400).send({ message: "Only PUT requests allowed" });
    return;
  }

  async function run() {
    try {
      const body = JSON.parse(req.body);
      const { kategori, deskripsi, lokasi, id } = body;

      if (!kategori || !deskripsi || !lokasi || !id) {
        return res.status(422).send({
          error: "isisan tidak lengkap",
        });
      }

      const upData = await db.one(
        `UPDATE hglusers SET kategori = $1, deskripsi =$2 ,
         lokasi = $3 WHERE id = $4 RETURNING id`,
        [kategori, deskripsi, lokasi, id]
      );

      if (!upData) {
        return res.status(404).send({
          error: "data tidak ditemukan",
        });
      }

      res.status(200).json(upData);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error creating on the server", error: error });
    }
  }
  run();
}
