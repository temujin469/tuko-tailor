import MyError from "../utils/MyError.js";
import User from "../models/User.js";
import asyncHandler from "express-async-handler";

// register
export const register = asyncHandler(async (req, res, next) => {
  const phoneNumberAlreadyExists = await User.findOne({
    phoneNumber: req.body.phoneNumber,
  });
  if (phoneNumberAlreadyExists) {
    throw new MyError("Дугаар хэдийн бүртгэгдсэн байна", 400);
  }

  const user = await User.create(req.body);
  const accessToken = user.createJWT();

  return res.status(201).json({
    success: true,
    user: {
      ...user._doc,
      accessToken,
    },
  });
});

// login
export const login = asyncHandler(async (req, res, next) => {
  const { phoneNumber, password } = req.body;

  if (!phoneNumber || !password) {
    throw new MyError("Дугаар болон нууц үгээ оруулна уу", 400);
  }

  const user = await User.findOne({ phoneNumber }).select("+password");

  if (!user) {
    throw new MyError("Дугаар буруу байна", 400);
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new MyError("нууц үг буруу байна", 400);
  }

  const token = user.createJWT();

  // attachCookiesToResponse(res, jwt);

  return res.status(200).json({
    success: "true",
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      _id: user._id,
      token,
    },
  });
});

// logout
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  return res.status(200).json({
    success: true,
    message: "succesfuly log out",
  });
});
