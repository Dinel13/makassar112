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
      const { nama } = body;

      if (!nama) {
        return res.status(422).send({
          error: ["isian tidak lengkap"],
        });
      }

      const isExits = await db.oneOrNone(
        `SELECT id, nama FROM wilayahs WHERE nama = $1`,
        [nama]
      );

      if (isExits) {
        return res.status(422).send({ error: ["wilayah sudah ada"] });
      }

      const newWilayah = await db.one(
        "INSERT INTO wilayahs(nama) VALUES($1) RETURNING id, nama",
        [nama]
      );

      res.status(200).json(newWilayah);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
