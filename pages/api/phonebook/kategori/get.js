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
          error: ["kata kunci tidak ada"],
        });
      }

      const isExits = await db.manyOrNone(
        `SELECT * FROM kategoris`,
      );

      res.status(200).json(isExits);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
