import { db } from "../../../lib/db";
import { getSession } from "next-auth/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session) {
    res.status(200).json({
      message: "You must signin.",
    });
  }

  if (req.method !== "DELETE") {
    res.status(400).send({ message: "Only DELETE requests allowed" });
    return;
  }

  async function run() {
    try {
      const body = JSON.parse(req.body);
      const { id } = body;

      if (!id) {
        return res.status(422).send({
          error: ["isisan tidak lengkap"],
        });
      }

      const deletedPhones = await db.oneOrNone(
        `DELETE FROM phonebook WHERE id = $1 RETURNING *`,
        [id]
      );

      if (!deletedPhones) {
        return res.status(404).send({
          error: ["data tidak ditemukan"],
        });
      }

      res.status(200).send({
        message: "data telah dihapus",
      });

    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
