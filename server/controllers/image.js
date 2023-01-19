import asyncHandler from "express-async-handler";
import { uploadMultipleImages } from "../utils/ImageUploader.js";

export const uploadImages = asyncHandler(async (req, res, next) => {
  const urls = await uploadMultipleImages(req.body.images);
  // console.log("urls==>", urls);

  return res.status(200).json({ success: true, urls });
});
