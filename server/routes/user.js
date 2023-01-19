import express from "express";
const router = express.Router();
import {
  getUser,
  getUsers,
  deleteUser,
  updateUser,
} from "../controllers/user.js";
import { authorizePermissions } from "../middlewares/authentication.js";

router.route("/").get(getUsers);

router
  .route("/:id")
  .get(getUser)
  .put(updateUser)
  .delete(authorizePermissions("CEO", "COO", "MANAGER"), deleteUser);

export default router;
