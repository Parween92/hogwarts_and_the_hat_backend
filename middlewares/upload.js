import multer from "multer";
import CloudinaryStorage from "../services/cloudinary.js";

const storage = new CloudinaryStorage();
const allowedFormats = [
  "png",
  "jpg",
  "jpeg",
  "svg",
  "webp",
  "heic",
  "avif",
  "gif",
  "mp4",
  "mp3",
  "mov",
];

const fileFilter = (req, file, cb) => {
  const fileExt = file.mimetype.split("/")[1];

  if (allowedFormats.includes(fileExt)) {
    cb(null, true);
  } else {
    cb(new Error("File type not allowed", { cause: 400 }));
  }
};

const fileSize = 1_048_576 * 2; // 2mb

const upload = multer({ storage, fileFilter, limits: { fileSize } });

export default upload;
