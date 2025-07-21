import { Router } from "express";
import { login, registerUser, logout } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import { registerSchema, loginSchema } from "../zod-schemas/user.schema.js";
import { getMe } from "../controllers/auth.controller.js";

const userRouter = Router();

// register
userRouter.post("/register", validate(registerSchema), registerUser);

// login
userRouter.post("/login", validate(loginSchema), login);

// logout
userRouter.post("/logout", logout);

// getme
userRouter.get("/me", getMe);
export default userRouter;
