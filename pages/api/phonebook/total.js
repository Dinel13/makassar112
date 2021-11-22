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
    let { page } = req.query;
    if (page == 1) {
      page = 0;
    } else {
      page = 14 * (page - 1);
    }
    try {
      const total = await db.one(
        "SELECT COUNT(*) FROM phones"
      );
      res.status(200).json(total);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
