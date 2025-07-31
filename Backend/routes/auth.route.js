import { Router } from "express";
import { authController } from "../controller/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-in", authController.signIn);
authRouter.post("/sign-up", authController.signUp);
authRouter.post("/google-auth", authController.googleAuth);
authRouter.post("/google", authController.googleAuth); // optional alias
authRouter.post("/sign-out", authController.signOut);

export { authRouter };
