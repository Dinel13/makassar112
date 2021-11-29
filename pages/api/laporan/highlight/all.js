import { db } from "../../../../lib/db";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(200).json({
      message: "You must signin.",
    });
  }

  if (req.method !== "GET") {
    res.status(400).send({ message: "Only GET requests allowed" });
    return;
  }

  async function run() {
    try {
      const all = await db.manyOrNone(
        `SELECT lap.* FROM higlights
        INNER JOIN laporans lap ON lap.id_laporan = higlights.laporan_id
        Order By created_at DESC`
      );
      res.status(200).json(all);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
