import { db } from "../../../lib/db";

export default async function handler(req, res) {
  if (!req.headers.authorization) {
    res.status(401).send({ message: "Tidak ada header" });
    return;
  }

  const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
  if (!token) {
    res.status(401).send({ message: "Tidak ada token" });
    return;
  }

  if (token !== "dasdh@32f30@$ad7980GG@#tt!09fda&d^d%adada#das970") {
    res.status(401).send({ message: "Token tidak valid" });
    return;
  }

  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  async function run() {
    try {
      const body = JSON.parse(req.body);
      const {
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

      if (!alamat || !kategori || !lokasi || !status) {
        return res.status(422).send({
          error: ["isisan tidak lengkap"],
        });
      }

      const newData = await db.one(
        `INSERT INTO laporans(agen, alamat, catatan, deskripsi, dinas, kategori, lokasi, pelapor, status, telp, tipe)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
        RETURNING id`,
        [
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

      if (!newData) {
        res.status(500).send({ message: "Tidak bisa menyimpan data" });
      }

      res.status(200).send({ message: "ok" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
