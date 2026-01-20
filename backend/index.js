import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectToMongoDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const port = process.env.PORT

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

connectToMongoDB();

app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api/auth", authRoutes);

app.listen(port, () => console.log("Server running on port: " + port));
