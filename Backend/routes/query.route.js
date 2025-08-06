import { Router } from "express";
import { queryController } from "../controller/query.controller.js";

const queryRouter = Router();
queryRouter.post("/", queryController.createQuery);

export { queryRouter };
