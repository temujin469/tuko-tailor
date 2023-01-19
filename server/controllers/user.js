import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import MyError from "../utils/MyError.js";

export const getUsers = asyncHandler(async (req, res, next) => {
  const select = req.query.select;
  const users = await User.find({}).select(select);

  return res.status(200).json({
    success: "true",
    users,
  });
});

export const getUser = asyncHandler(async (req, res, next) => {
  const select = req.query.select;

  const userId = req.params.id;
  const user = await User.findById(userId).select(select);

  if (!user) throw new MyError("user oldsongui", 404);

  return res.status(200).json({
    success: "true",
    user,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const newInfo = req.body;

  const user = await User.findByIdAndUpdate(userId, newInfo, {
    new: true,
  });

  if (!user) throw new MyError("user oldsongui", 404);

  return res.status(200).json({
    success: "true",
    message: "amjillltai update hiile",
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findByIdAndDelete(userId);

  if (!user) throw new MyError("user oldsongui", 404);

  return res.status(200).json({
    success: true,
    message: "amjilttai ustdlaa",
  });
});
