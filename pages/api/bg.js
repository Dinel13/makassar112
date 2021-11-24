import { getSession } from "next-auth/client";
import nextConnect from "next-connect";
import { fileUpload } from "../../lib/fileUpload";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

async function auth(req, res, next) {
  const session = await getSession({ req });
  if (!session) {
    res.status(200).json({
      message: "You must signin.",
    });
  }
  next()
}

apiRoute.use(auth, fileUpload.single("file"));

apiRoute.post((req, res) => {
  res.status(200).json({ data: "success" });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
