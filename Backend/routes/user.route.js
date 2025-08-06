import { Router } from "express";
import { userController } from "../controller/user.controller.js";
import { jwtAuthentication } from "../middleware/jwtAuthentication.js";
import { requireEmailVerification } from "../middleware/emailVerification.js";

const userRouter = Router();

userRouter.use(jwtAuthentication);

// GET user profile doesn't require verification (user might need to access profile to see verification status)
userRouter.get("/:id", userController.getUser);

// Other operations require email verification
userRouter.use(requireEmailVerification);

// TODO
// userRouter.get("/:id/saved-books");
// userRouter.get("/:id/reviews");

userRouter.put("/:id", userController.updateUser);

export { userRouter };
