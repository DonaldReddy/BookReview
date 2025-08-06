import { Router } from "express";
import { reviewController } from "../controller/review.controller.js";
import { jwtAuthentication } from "../middleware/jwtAuthentication.js";
import { requireEmailVerification } from "../middleware/emailVerification.js";

const reviewRouter = Router();

reviewRouter.use(jwtAuthentication);
reviewRouter.use(requireEmailVerification); // Require email verification for all review operations

reviewRouter.get("/", reviewController.getBookReviews);

reviewRouter.post("/", reviewController.addBookReview);
reviewRouter.post("/refine", reviewController.refineBookReview);

export { reviewRouter };
