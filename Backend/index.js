import dotenv from "dotenv";
import { connectToDatabase } from "./database/dbConnect.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { bookRouter } from "./routes/book.route.js";
import { reviewRouter } from "./routes/review.route.js";
import { queryRouter } from "./routes/query.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
console.log(process.env.FRONTEND_URL);

const corsOptions = {
	origin: [process.env.FRONTEND_URL || "http://localhost:5173", "http://localhost:5174"],
	credentials: true,
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
	optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/query", queryRouter);

connectToDatabase()
	.then(() => {
		console.log("Database operations can proceed.");
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	})
	.catch((error) => {
		console.error("Error during database operations", error);
	});
