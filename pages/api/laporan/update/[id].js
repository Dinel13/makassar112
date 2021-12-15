import { db } from "../../../../lib/db";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(200).json({
      message: "You must sign in.",
    });
  }

  if (req.method !== "PUT") {
    res.status(400).send({ message: "Only PUT requests allowed" });
    return;
  }

  async function run() {
    async function run() {
      try {
        const { id } = req.query;

        if (!id) {
          return res.status(422).send({
            error: "ID is required",
          });
        }

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
            error: "isian tidak lengkap",
          });
        }

        const updatedData = await db.one(
          `UPDATE laporan SET 
          agen = $1,
          alamat = $2,
          catatan = $3,
          deskripsi = $4,
          dinas = $5,
          kategori = $6,
          lokasi = $7,
          pelapor = $8,
          status = $9,
          telp = $10,
          tipe = $11
          WHERE id = $12
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
            req.params.id,
          ]
        );

        if (!newData) {
          res.status(500).send({ message: "Tidak bisa menyimpan data" });
        }

        res.status(200).send({ message: "Ok" });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .send({ message: ["Error creating on the server"], error: error });
      }
    }
    run();
  }
}
