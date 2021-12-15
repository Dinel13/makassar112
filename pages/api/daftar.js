import { db } from "../../lib/db";
import { hash } from "bcryptjs";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }
  async function run() {
    try {
      const body = JSON.parse(req.body);
      const { nama, email, password, kode } = body;

      if (
        !nama ||
        !email.includes("@") ||
        password.trim().length < 5 ||
        !kode
      ) {
        return res
          .status(422)
          .send({ error: "Isian tidak lengkap atau password terlalu pendek" });
      }

      if (kode !== "Rahassia@112") {
        return res.status(422).send({ error: "Kode operator tidak sesuai" });
      }

      const userExits = await db.oneOrNone(
        `SELECT * FROM users WHERE email = $1`,
        [email]
      );

      if (userExits) {
        return res.status(422).send({ error: ["Email sudah terdaftar"] });
      }

      const hashPassword = await hash(password, 12);

      const newUser = await db.one(
        "INSERT INTO users(nama, email, password) VALUES($1, $2, $3) RETURNING id, nama, email",
        [nama, email, hashPassword]
      );

      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
      // console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
