import { db } from "../../../lib/db";
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
      const { query } = body;
      console.log(query);

      if (!query) {
        return res.status(422).send({
          error: ["isisan tidak lengkap"],
        });
      }

      const resultSearch = await db.query(
         `SELECT * FROM phones WHERE LOWER(nama) LIKE LOWER('%${query}%') LIMIT 30`
      );

      res.status(200).json(resultSearch);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
