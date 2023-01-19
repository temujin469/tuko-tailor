import asyncHandler from "express-async-handler";
import MyError from "../utils/MyError.js";
import { isTokenValid } from "../utils/token.js";

export const authenticateUser = asyncHandler(async (req, res, next) => {
  let token;
  // check header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  // // check cookies
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // console.log('cookies',req.cookies)
  // console.log('signed cookies',req.signedCookies)

  if (!token) {
    throw new MyError("Баталгаажуулалт хүчингүй", 401);
  }
  const authorizedUser = isTokenValid(token);

  const { userId, role } = authorizedUser;

  // user болон role ийг req объектод хавсаргана
  req.user = {
    userId,
    role,
  };

  // console.log("reqqq", req.user);
  next();
});

export const authorizePermissions = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new MyError("Та нэ route -рүү нэвтрэх боломжгүй байна", 401);
    }
    next();
  };
};
