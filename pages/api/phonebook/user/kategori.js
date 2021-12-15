import { db } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  async function run() {
    try {
      const body = JSON.parse(req.body);
      const { kategori } = body;
      if (!kategori) {
        return res.status(422).send({
          error: ["Isian tidak lengkap"],
        });
      }
      // get the data from the database
      const result = await db.query(
        `SELECT * FROM phones WHERE status = 'publik' AND LOWER(kategori) = LOWER('${kategori}')
        LIMIT 300`
      );

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
