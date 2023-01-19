import MyError from "../utils/MyError.js";
import Order from "../models/Order.js";
import asyncHandler from "express-async-handler";

export const addOrder = asyncHandler(async (req, res, next) => {
  // console.log("order body===>", req.body);

  const newOrder = {
    ...req.body,
    workers: [req.user.userId],
  };
  const order = await Order.create(newOrder);

  return res.status(201).json({
    success: true,
    order,
  });
});

export const updateOrder = asyncHandler(async (req, res, next) => {
  let body = req.body;

  const order = await Order.findByIdAndUpdate(req.params.id, body, {
    new: true,
  });

  if (!order) throw new MyError("Orders oldsongui", 404);

  return res.status(201).json({
    success: true,
    order,
  });
});

export const getOrders = asyncHandler(async (req, res, next) => {
  const worker = req.query.worker;
  const search = req.query.search || "";
  const select =
    req.query.select || "-bodyInfo -otherInfo -paymentInfo -images";
  let orders;

  ["worker", "search", "select"].forEach((el) => delete req.query[el]);

  // my===true baiwal uurinhu orderiig shvvj awna
  if (worker) {
    const myRole = req.user.role.toLowerCase();

    let getOrders = await Order.find({ workers: { $in: worker } })
      .populate({ path: "workers", select: "firstname phoneNumber role" })
      .select(select);

    orders = getOrders.map((order) => {
      return {
        myStatus: order[myRole]?.status,
        myOnoo: order[myRole]?.onoo,
        ...order._doc,
        isCompleted: order.isCompleted,
      };
    });
  } else {
    orders = await Order.find({
      ...req.query,
      name: { $regex: search, $options: "i" },
    })
      // .populate({ path: "workers", select: "firstname phoneNumber role" })
      .select(select);
  }

  return res.status(200).json({
    success: true,
    orders,
  });
});

export const getOrder = asyncHandler(async (req, res, next) => {
  const select = req.query.select;
  const orderId = req.params.id;
  const order = await Order.findById(orderId).select(select);

  if (!order) throw new MyError("order oldsongui", 404);

  return res.status(200).json({
    success: true,
    order,
  });
});

export const deleteOrder = asyncHandler(async (req, res, next) => {
  const orderId = req.params.id;
  await Order.findByIdAndDelete(orderId);

  return res.status(200).json({
    success: true,
    message: "amjilttai ustlaa",
  });
});
