import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: true,
    },
    lastname: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: true,
    },
    owog: {
      type: String,
      trim: true,
    },
    registerNumber: {
      type: String,
    },
    birthDate: {
      type: Date,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    homePhoneNumber: {
      type: Number,
    },
    address: {
      type: String,
    },
    role: {
      type: String,
      enum: [
        "CEO",
        "COO",
        "MANAGER",
        "DESIGNER",
        "ESGUURCHIN",
        "OYDOLCHIN",
        "HATGAMALCHIN",
        "TOWCHSHILBE",
        "GARCHIMEGLEL",
      ],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));
  if (!this.isModified("password")) next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

userSchema.methods.createJWT = function () {
  const accessToken = jwt.sign(
    { userId: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );

  console.log("shineer token vvslee");
  return accessToken;
};

userSchema.methods.generatePasswordChangeToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("users", userSchema);
