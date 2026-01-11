import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email",
      },
      required: [true, "Email required"],
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
    sentRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
    receivedRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
        unique: true,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now(),
      required: false,
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
