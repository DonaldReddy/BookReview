import { Router } from "express";
import { reviewController } from "../controller/review.controller.js";
import { jwtAuthentication } from "../middleware/jwtAuthentication.js";

const reviewRouter = Router();

reviewRouter.use(jwtAuthentication);

reviewRouter.get("/", reviewController.getBookReviews);

reviewRouter.post("/", reviewController.addBookReview);
reviewRouter.post("/refine", reviewController.refineBookReview);

export { reviewRouter };
