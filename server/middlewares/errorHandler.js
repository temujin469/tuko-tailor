import MyError from "../utils/MyError.js";

export default (err, req, res, next) => {
  if (err.name === "CastError") {
    const message = `Resource not found invalid: ${err.path}`;
    err = new MyError(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    err = new MyError(message, 400);
  }

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Дотоод серверийн алдаа",
  });
};
