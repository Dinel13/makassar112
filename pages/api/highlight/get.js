import { db } from "../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(400).send({ message: "Only GET requests allowed" });
    return;
  }

  async function run() {
    try {
      const allData = await db.manyOrNone(`SELECT * FROM hglusers `);
      res.status(200).json(allData);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Error creating on the server", error: error });
    }
  }
  run();
}
