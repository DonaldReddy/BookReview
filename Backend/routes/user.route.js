import { Router } from "express";
import { userController } from "../controller/user.controller.js";
import { jwtAuthentication } from "../middleware/jwtAuthentication.js";

const userRouter = Router();

userRouter.use(jwtAuthentication);
userRouter.get("/:id", userController.getUser);
// TODO
// userRouter.get("/:id/saved-books");
// userRouter.get("/:id/reviews");

userRouter.put("/:id", userController.updateUser);

export { userRouter };
