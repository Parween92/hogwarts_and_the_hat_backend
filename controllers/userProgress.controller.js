import { UserProgress } from "../models/UserProgress.js";
import ErrorResponse from "../utils/ErrorResponse.js";

export async function getUserProgress(req, res) {
  const { userId } = req.params;
  const progress = await UserProgress.findOne({ userId });
  if (!progress) throw new ErrorResponse("UserProgress not found", 404);
  res.json({ data: progress });
}

export async function updateUserProgress(req, res) {
  const { userId } = req.params;
  let updateData = req.body;

  if (updateData.houses) {
    updateData.houses = updateData.houses.map((house) =>
      house.completedAt && typeof house.completedAt === "string"
        ? { ...house, completedAt: new Date(house.completedAt) }
        : house
    );
  }
  const progress = await UserProgress.findOneAndUpdate({ userId }, updateData, {
    new: true,
  });
  if (!progress) throw new ErrorResponse("UserProgress not found", 404);
  res.json({ data: progress });
}

export async function initUserProgress(req, res) {
  const { userId } = req.body;
  const exists = await UserProgress.findOne({ userId });
  if (exists) throw new ErrorResponse("Already exists", 409);
  const progress = new UserProgress({
    userId,
    houses: [
      { houseName: "Gryffindor" },
      { houseName: "Slytherin" },
      { houseName: "Hufflepuff" },
      { houseName: "Ravenclaw" },
    ],
  });
  await progress.save();
  res.json({ data: progress });
}
