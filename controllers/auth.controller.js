import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ErrorResponse from "../utils/ErrorResponse.js";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const isProduction = process.env.NODE_ENV === "production";

// Registration
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ErrorResponse("Email is already registered", 400);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, passwordHash });

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "24h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",

    maxAge: 2 * 60 * 60 * 1000,
  });

  res.json({
    user: { id: user._id, username: user.username, email: user.email },
  });
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new ErrorResponse("User not found", 400);
  }

  const pwOk = await bcrypt.compare(password, user.passwordHash);
  if (!pwOk) {
    throw new ErrorResponse("Incorrect password", 400);
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
    expiresIn: "24h",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",

    maxAge: 2 * 60 * 60 * 1000,
  });

  res.json({
    user: { id: user._id, username: user.username, email: user.email },
  });
};

// GET me, wenn user Token is valid
export const getMe = async (req, res) => {
  const token =
    req.cookies.token ||
    (req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    throw new ErrorResponse("Not logged in", 401);
  }

  const payload = jwt.verify(token, JWT_SECRET);
  const user = await User.findById(payload.id);
  if (!user) {
    throw new ErrorResponse("User not found", 404);
  }

  const { passwordHash, ...userData } = user.toObject();
  res.json({ user: userData });
};

// Logout
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.json({ message: "Logout successful" });
};
