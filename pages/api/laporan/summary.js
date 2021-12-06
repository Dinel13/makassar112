import { db } from "../../../lib/db";
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
      // get count by categori
      const homecare = await db.one(
        `SELECT COUNT(*) as total FROM laporans WHERE kategori = 'HOME CARE'`
      );

      const lampuJalan = await db.one(
        `SELECT COUNT(*) as total FROM laporans WHERE kategori = 'LAMPU JALAN'`
      );

      const covid = await db.one(
        `SELECT COUNT(*) as total FROM laporans WHERE kategori = 'COVID-19'`
      );

      const kebakaran = await db.one(
        `SELECT COUNT(*) as total FROM laporans WHERE kategori = 'KEBAKARAN'`
      );

      const kriminalitas = await db.one(
        `SELECT COUNT(*) as total FROM laporans WHERE kategori = 'KRIMINALITAS'`
      );
      res
        .status(200)
        .json({ homecare, lampuJalan, covid, kebakaran, kriminalitas });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error creating on the server", error: error });
    }
  }
  run();
}
