// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { authRouter } from "./routes/auth.route.js";
// import { userRouter } from "./routes/user.route.js";
// import { bookRouter } from "./routes/book.route.js";
// import { reviewRouter } from "./routes/review.route.js";
// import { queryRouter } from "./routes/query.route.js";

// // If you want to test email service, import email service here
// // import { emailService } from "./service/email.service.js";

// const app = express();
// const PORT = process.env.PORT || 3000;

// const corsOptions = {
//   origin: process.env.FRONTEND_URL || "http://localhost:5173",
//   credentials: true,
// };

// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use("/api/v1/auth", authRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/books", bookRouter);
// app.use("/api/v1/reviews", reviewRouter);
// app.use("/api/v1/query", queryRouter);

// // ============================
// // Skip DB connection for UI work
// // ============================
// // connectToDatabase()
// //     .then(() => {
// //         console.log("Database operations can proceed.");
// //         app.listen(PORT, () => {
// //             console.log(`Server is running on port ${PORT}`);
// //         });
// //     })
// //     .catch((error) => {
// //         console.error("Error during database operations", error);
// //     });

// // Start server anyway for testing frontend / contact page
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT} (DB skipped for UI work)`);
// });
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/auth.route.js";
import { userRouter } from "./routes/user.route.js";
import { bookRouter } from "./routes/book.route.js";
import { reviewRouter } from "./routes/review.route.js";
import { queryRouter } from "./routes/query.route.js";

// ==========================
// Initialize App
// ==========================
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// ==========================
// API Routes
// ==========================
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/query", queryRouter);

// ==========================
// Start Server
// ==========================
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
