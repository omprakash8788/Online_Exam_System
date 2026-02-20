import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectToMongoDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
// import testRoutes from "./routes/testRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
// import questionRoutes from "./routes/questionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://online-exam-frontend-4cqa.onrender.com",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
connectToMongoDB();
app.get("/", (req, res) => {
  res.send("API working");
});
app.use("/api/auth", authRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);

app.listen(port, () => console.log("Server running on port: " + port));
