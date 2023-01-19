import MyError from "./MyError.js";

import jwt from "jsonwebtoken";

// JWT hvchintei vgvig  shalgaad decode hiij butsaah
export const isTokenValid = (token) =>
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) throw new MyError("Хүчингүй Token", 400);
    return decoded;
  });

export const attachCookiesToResponse = (res, token) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: false,
  });
};
