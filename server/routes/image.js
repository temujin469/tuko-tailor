import express from "express";
import { uploadImages } from "../controllers/image.js";
const router = express.Router();

router.route("/").post(uploadImages);

export default router;
