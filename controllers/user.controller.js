import { User } from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// REGISTER
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (await User.findOne({ email })) {
    throw new ErrorResponse("Email is already registered", 400);
  }

  const user = await User.create({ username, email, password });

  res.status(201).json({
    user: { id: user._id, username: user.username, email: user.email },
  });
};

// LOGIN
export const login = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ErrorResponse("User not found", 400);

  res.json({
    user: { id: user._id, username: user.username, email: user.email },
  });
};

// LOGOUT
export const logout = (req, res) => {
  res.json({ message: "Logout successful" });
};
