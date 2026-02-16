// import mongoose from "mongoose";
// const questionSchema = new mongoose.Schema(
//   {
//     testId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "MockTest",
//       required: true,
//     },
//     question: { type: String, required: true },
//     options: {
//       type: [String],
//       validate: v => v.length >= 2,
//     },
//     correctAnswer: {
//       type: Number,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );
// export default mongoose.model("Question", questionSchema);


import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true
    },
    question: { type: String, required: true },
    options: {
      type: [String],
      validate: v => v.length >= 2
    },
    correctAnswer: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
