
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { routes } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { AppError } from "./utils/AppError";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ status: "success", message: "ARMS API is running" });
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/arms_db";

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

export default app;
