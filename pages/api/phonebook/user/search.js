import { db } from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }

  async function run() {
    try {
      const body = JSON.parse(req.body);
      const { query } = body;
      if (!query) {
        return res.status(422).send({
          error: ["isisan tidak lengkap"],
        });
      }

      // split the query into words
      const words = query.split(" ");

      // result will be contain all the data that match the query
      const result = [];

      // loop words to find the data
      for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // get the data from the database
        const resultSearch = await db.query(
          `SELECT * FROM phones WHERE status = 'publik' AND
           LOWER(nama) LIKE LOWER('%${word}%') 
          OR LOWER(wilayah) LIKE LOWER('%${word}%') 
          LIMIT 200`
        );

        // push the data to the result if the data is not already in the result
        for (let j = 0; j < resultSearch.length; j++) {
          const data = resultSearch[j];
          // loop the result to check if the data is already in the result
          let isAlreadyInResult = false;
          for (let k = 0; k < result.length; k++) {
            const dataInResult = result[k];
            if (dataInResult.id === data.id) {
              isAlreadyInResult = true;
              break;
            }
          }

          // if the data is not already in the result, push it to the result
          if (!isAlreadyInResult) {
            result.push(data);
          }
        }
      }

      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: ["Error creating on the server"], error: error });
    }
  }
  run();
}
