import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    subject: String, 
    difficulty: String,
    duration: Number,
    totalQuestions: Number,
    markingScheme: {
      correct: Number,
      wrong: Number,
    },
    isPaid: { type: Boolean, default: false },
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
); 

export default mongoose.model("Test", testSchema);
