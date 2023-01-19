import express from "express";
const router = express.Router();
import {
  addOrder,
  getOrder,
  getOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.js";
import { authorizePermissions } from "../middlewares/authentication.js";

router
  .route("/")
  .post(authorizePermissions("CEO", "COO", "MANAGER", "DESIGNER"), addOrder)
  .get(
    authorizePermissions(
      "CEO",
      "COO",
      "MANAGER",
      "DESIGNER",
      "ESGUURCHIN",
      "OYDOLCHIN",
      "HATGAMALCHIN",
      "TOWCHSHILBE",
      "GARCHIMEGLEL"
    ),
    getOrders
  );

router
  .route("/:id")
  .put(
    authorizePermissions(
      "CEO",
      "COO",
      "MANAGER",
      "DESIGNER",
      "ESGUURCHIN",
      "OYDOLCHIN",
      "HATGAMALCHIN",
      "TOWCHSHILBE",
      "GARCHIMEGLEL"
    ),
    updateOrder
  )
  .get(getOrder)
  .delete(deleteOrder);

export default router;
