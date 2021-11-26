const multer = require("multer");
const path = require("path");
import getConfig from 'next/config'

const MIME_TYPE_MAP = {
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};

export const excelUpload = multer({
  limits: { fileSize: 1048576 },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(getConfig().serverRuntimeConfig.PROJECT_ROOT, "/upload"));;
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, "file.xlsx");
      // cb(null, "test" + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid file type!");
    cb(error, isValid);
  },
});
