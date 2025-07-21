import { z } from "zod";

const houseNameEnum = z.enum([
  "Gryffindor",
  "Slytherin",
  "Hufflepuff",
  "Ravenclaw",
]);

// Schema für ein House mit score prüfen
const houseProgressSchema = z.object({
  houseName: houseNameEnum,
  isCompleted: z.boolean().optional(),
  completedAt: z.date().nullable().optional(),
  score: z.number().optional(),
});

// Houseprogress mit Poinst prüfen
export const userProgressSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  houses: z.array(houseProgressSchema).optional(),
  pointsGryffindor: z.number().optional(),
  pointsHufflepuff: z.number().optional(),
  pointsRavenclaw: z.number().optional(),
  pointsSlytherin: z.number().optional(),
});

// Schema prfen nachdem User angelmdelt ist
export const initProgressSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
});

// Schema prüfen wenn ein House abgeschlossen ist
export const completeHouseSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  houseName: houseNameEnum,
});
