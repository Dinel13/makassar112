import { db } from "../../lib/db";


async function handler(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

}

export default handler;