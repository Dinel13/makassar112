import { db } from "../../../../lib/db";
import { getSession } from "next-auth/client";

async function deleteData(id) {
  try {
    // delete data if older than 1 hours (3600 seconds) use sql
    const deleteData = await db.query(
      `DELETE FROM higlights WHERE laporan_id = $1 RETURNING *`,
      [id]
    );
  } catch (error) {
    console.log(error);
  }
}

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
      const { id_laporan } = body;

      if (!id_laporan ) {
        return res.status(422).send({
          error: ["isisan tidak lengkap"],
        });
      }

      const newData = await db.one(
        `INSERT INTO higlights(laporan_id) VALUES($1) 
        RETURNING laporan_id`,
        [id_laporan]
      );

      if (newData) {
        setTimeout(() => {
          deleteData(newData.laporan_id);
        }, 3 * 1000); // 1 hari
      // }, 24 * 60 * 60 * 1000); // 1 hari
      }

      return res.status(200).json(newData);
    } catch (error) {
      console.error(error);
      if (error.code === "23505") {
        return res.status(422).send({
          error: "data sudah ada",
        });
      }
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
