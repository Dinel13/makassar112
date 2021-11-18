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
      const {id, nama, phone, kategori_id, kategori, lokasi, status } = body;

      if (!id|| !nama || !phone || !kategori_id || !kategori || !lokasi || !status) {
        return res.status(422).send({
          error: ["isisan tidak lengkap"],
        });
      }
      console.log(body);

      const updatedPhonebook = await db.one(
         `UPDATE phones SET nama = $1, phone = $2, kategori_id = $3, kategori = $4, lokasi = $5, status = $6, updated_at = NOW() WHERE id = $7 RETURNING *`,
         [nama, phone, kategori_id, kategori, lokasi, status, id]
      );

      res.status(200).json(updatedPhonebook);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
