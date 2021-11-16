const pgp = require("pg-promise")({
  noWarnings: true,
});

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }
  async function run() {
    try {
      const body = JSON.parse(req.body);
      console.log(body);
      const { nama, email, password, kode } = body;
      console.log(body);

      if (!nama || !email || !password || !kode) {
        return res.status(422).send({ error: ["isisan tidak lengkap"] });
      }

      if (kode !== "Rahassia@112") {
        return res.status(422).send({ error: ["kode tidak sesuai"] });
      }

      const product = await db.one(
        "INSERT INTO users(nama, email, password) VALUES($1, $2, $3) RETURNING id, nama, email",
        [nama, email, password]
      );

      res.status(200).json(product);
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

const db = pgp(`postgres://din:postgres@localhost:5432/makassar112`);
