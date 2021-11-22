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
      const { kategori, startDate, endDate } = body;
      console.log(kategori, startDate, endDate);

      if (!kategori || !startDate || !endDate) {
        return res.status(422).send({
          error: ["isisan tidak lengkap"],
        });
      }

      if (kategori === "semua") {
        const total = await db.query(
          "SELECT * FROM laporans WHERE updated_at BETWEEN $1 AND $2",
          [startDate, endDate]
        );
        res.status(200).json(total);

        return;
      }

      const resultSearch = await db.query(
        `SELECT * FROM laporans WHERE LOWER(kategori) = LOWER($1) 
         AND updated_at BETWEEN $2 AND $3 `,
        [kategori, startDate, endDate]
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
