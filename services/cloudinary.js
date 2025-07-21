import { v2 as cloudinary } from "cloudinary";
class CloudinaryStorage {
  _handleFile(req, file, cb) {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          cb(error);
        }
        cb(null, result);
      }
    );
    file.stream.pipe(uploadStream);
  }
  _removeFile(req, file, cb) {
    cb(new Error("Invalid atempt"), false);
  }
}
export default CloudinaryStorage;
