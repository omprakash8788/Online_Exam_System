import mongoose from "mongoose";

const mockTestSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    subject: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    duration: Number,
    totalQuestions: Number,
    markingScheme: {
      correct: { type: Number, default: 4 },
      wrong: { type: Number, default: -1 },
    },
    isPaid: { type: Boolean, default: false },
  },
  { timestamps: true },
);
export default mongoose.model("MockTest", mockTestSchema);
