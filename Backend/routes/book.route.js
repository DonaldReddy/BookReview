import { Router } from "express";
import { isAdmin } from "../middleware/roleAuthorization.js";
import { bookController } from "../controller/book.controller.js";
import { jwtAuthentication } from "../middleware/jwtAuthentication.js";

const bookRouter = Router();

bookRouter.get("/", bookController.getBooks);
bookRouter.get("/featured", bookController.getFeaturedBooks);
bookRouter.get("/:id", bookController.getBookById);

bookRouter.use(jwtAuthentication);
bookRouter.use(isAdmin);

bookRouter.post("/", bookController.createBook);

bookRouter.put("/:id", bookController.updateBook);

bookRouter.delete("/:id", bookController.deleteBook);

export { bookRouter };
