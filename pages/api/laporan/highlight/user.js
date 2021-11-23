import { db } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(400).send({ message: "Only GET requests allowed" });
    return;
  }

  async function run() {
    try {
      const all = await db.manyOrNone(
        "SELECT id, deskripsi, pelapor, updated_at FROM higlights Order By updated_at DESC"
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
