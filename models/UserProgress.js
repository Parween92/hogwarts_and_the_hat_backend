import { Schema, model } from "mongoose";

const houseSchema = new Schema({
  houseName: { type: String, required: true },
  score: { type: Number, default: 0 },
  isCompleted: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
});

const userProgressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  houses: { type: [houseSchema], default: [] },
  pointsGryffindor: { type: Number, default: 0 },
  pointsHufflepuff: { type: Number, default: 0 },
  pointsSlytherin: { type: Number, default: 0 },
  pointsRavenclaw: { type: Number, default: 0 },
});

export const UserProgress = model("UserProgress", userProgressSchema);
