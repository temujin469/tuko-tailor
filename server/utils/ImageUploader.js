import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import MyError from "./MyError.js";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const options = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
  // discard_original_filename: true,
  folder: "orders",
};

const uploadImage = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, options, (err, result) => {
      if (result && result.secure_url) {
        // console.log("secure url==>", result.secure_url);
        return resolve(result.secure_url);
      }
      // console.log(err.message.slice(1, 1000));
      return reject(new MyError(err.message, 500));
    });
  });
};

export const uploadMultipleImages = (images) => {
  return new Promise((resolve, reject) => {
    const uploadedImages = images.map((image) => uploadImage(image));
    Promise.all(uploadedImages)
      .then((values) => resolve(values))
      .catch((err) => reject(new MyError(err.message, 500)));
  });
};
