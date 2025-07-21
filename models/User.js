import { Schema, model } from "mongoose";

const userModel = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    currentHouse: {
      type: String,
      enum: ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"],
      default: null,
    },
    userProgressId: {
      type: Schema.Types.ObjectId,
      ref: "UserProgress",
    },
  },
  { timestamps: true }
);

export const User = model("User", userModel);
