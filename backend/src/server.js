import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

console.log(path.join(__dirname, "../frontend/dist"));

connectDB();

if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: ["http://localhost:5173"]
    }));
}

app.use(express.json());
app.use(rateLimiter);


app.use("/api/notes", notesRoutes);


if (process.env.NODE_ENV === "production") {
    console.log("Static path:", path.join(__dirname, "../frontend/dist"));

    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});