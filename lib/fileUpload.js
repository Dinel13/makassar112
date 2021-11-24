const multer = require("multer");
const path = require("path");
import getConfig from 'next/config'
// const { v4: uuid } = require("uuid");

const MIME_TYPE_MAP = {
  // "image/png": "png",
  "image/jpeg": "jpeg",
  // "image/jpg": "jpg",
};

export const fileUpload = multer({
  limits: { fileSize: 1048576 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, "/public/files"));;
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, "bg.jpeg");
      // cb(null, "test" + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid file type!");
    cb(error, isValid);
  },
});
