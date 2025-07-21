import express from "express";
import {
  getUserProgress,
  updateUserProgress,
  initUserProgress,
} from "../controllers/userProgress.controller.js";
import validateUserId from "../middlewares/validateUserId.js";
import { UserProgress } from "../models/UserProgress.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const userProgressRouter = express.Router();

userProgressRouter.get("/:userId", validateUserId, getUserProgress);
userProgressRouter.put("/:userId", validateUserId, updateUserProgress);
userProgressRouter.post("/init", validateUserId, initUserProgress);

// Gewinnerhaus bestimmen, um den Hut uns zu zuweisen
userProgressRouter.get(
  "/:userId/top-house",
  validateUserId,
  async (req, res) => {
    const { userId } = req.params;

    const progress = await UserProgress.findOne({ userId });
    if (!progress) throw new ErrorResponse("Not found", 404);

    const houses = [
      { name: "Slytherin", points: progress.pointsSlytherin ?? -Infinity },
      { name: "Gryffindor", points: progress.pointsGryffindor ?? -Infinity },
      { name: "Hufflepuff", points: progress.pointsHufflepuff ?? -Infinity },
      { name: "Ravenclaw", points: progress.pointsRavenclaw ?? -Infinity },
    ];

    const maxPoints = Math.max(...houses.map((h) => h.points));

    const topHouses = houses.filter((h) => h.points === maxPoints);

    const winner = topHouses[Math.floor(Math.random() * topHouses.length)].name;
    res.json({ topHouse: winner, scores: progress });
  }
);

export default userProgressRouter;
