import { db } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  async function run() {
    try {
      const body = JSON.parse(req.body);
      const { query } = body;
      if (!query) {
        return res.status(422).send({
          error: ["isisan tidak lengkap"],
        });
      }

      // get the data from the database
      const result = await db.query(
        `SELECT * FROM phones WHERE status = 'publik' AND LOWER(wilayah) LIKE LOWER('%${query}%') 
        LIMIT 120`
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
