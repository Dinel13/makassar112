import { db } from "../../../../lib/db";
import { getSession } from "next-auth/client";

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
      const {
        id,
        agen,
        alamat,
        catatan,
        deskripsi,
        dinas,
        kategori,
        lokasi,
        pelapor,
        status,
        telp,
        tipe,
      } = body;

      console.log(body);

      if (!id || !alamat || !kategori || !lokasi || !status) {
        return res.status(422).send({
          error: ["isisan tidak lengkap"],
        });
      }

      const newData = await db.one(
        `INSERT INTO higlights(lid, agen, alamat, catatan, deskripsi, dinas, kategori, lokasi, pelapor, status, telp, tipe)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ) 
        RETURNING *`,
        [
          id,
          agen,
          alamat,
          catatan,
          deskripsi,
          dinas,
          kategori,
          lokasi,
          pelapor,
          status,
          telp,
          tipe,
        ]
      );
      return res.status(200).json(newData);
    } catch (error) {
      console.error(error);
      if (error.code === "23505") {
        return res.status(422).send({
          error: "data sudah ada",
        });
      }
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
