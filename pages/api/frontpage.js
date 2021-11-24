import middleware from '../../middleware/middleware'
import nextConnect from 'next-connect'

const handler = nextConnect()
handler.use(middleware)

handler.post(async (req, res) => {
  console.log(req.body)
  console.log(req.files)

  //...
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default handler
// import { getSession } from "next-auth/client";
// import formidable from "formidable";
// import path from "path";
// import fs from "fs";

// export default async function handler(req, res) {
//   const session = await getSession({ req });

//   if (!session) {
//     res.status(200).json({
//       message: "You must signin.",
//     });
//   }

//   if (req.method !== "POST") {
//     res.status(400).send({ message: "Only POST requests allowed" });
//     return;
//   }

//   //UPLOAD FILE
//   const form = new formidable.IncomingForm();
//   const uploadFolder = path.join(__dirname, "public", "files");

//   form.multiples = false;
//   form.maxFileSize = 50 * 1024 * 1024; // 5MB
//   form.uploadDir = uploadFolder;

//   // Parsing
//   form.parse(req, async (err, fields, files) => {
//     console.log(fields);
//     console.log(files);
//     if (err) {
//       console.log("Error parsing the files");
//       return res.status(400).json({
//         status: "Fail",
//         message: "There was an error parsing the files",
//         error: err,
//       });
//     }

//     const isFileValid = (file) => {
//       const type = file.type.split("/").pop();
//       const validTypes = ["jpg", "jpeg", "png", "gif"];
//       if (validTypes.indexOf(type) === -1) {
//         return false;
//       }
//       return true;
//     };

//     const file = files.myFile;

//     // checks if the file is valid
//     const isValid = isFileValid(file);

//     // creates a valid name by removing spaces
//     const fileName = encodeURIComponent(file.name.replace(/\s/g, "-"));

//     if (!isValid) {
//       // throes error if file isn't valid
//       return res.status(400).json({
//         status: "Fail",
//         message: "The file type is not a valid type",
//       });
//     }
//     try {
//       // renames the file in the directory
//       fs.renameSync(file.path, join(uploadFolder, fileName));
//     } catch (error) {
//       console.log(error);
//     }

//     try {
//       // stores the fileName in the database
//       const newFile = await File.create({
//         name: `files/${fileName}`,
//       });
//       return res.status(200).json({
//         status: "success",
//         message: "File created successfully!!",
//       });
//     } catch (error) {
//       res.json({
//         error,
//       });
//     }
//   });
// }

// import nextConnect from 'next-connect';
// import multer from 'multer';

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: '../public/uploads',
//     filename: (req, file, cb) => cb(null, file.originalname),
//   }),
// });

// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// });

// apiRoute.use(upload.single('files'));

// apiRoute.post((req, res) => {
//   res.status(200).json({ data: 'success' });
// });

// export default apiRoute;

// export const config = {
//   api: {
//     bodyParser: false, // Disallow body parsing, consume as stream
//   },
// };
