// import MockTest from "../models/MockTest.js";
// export const createMockTest = async (req, res) => {
//   try {
//     const test = await MockTest.create(req.body);
//     res.status(201).json({
//       success: true,
//       data: test,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // GET ALL MOCK TESTS
// export const getAllMockTests = async (req, res) => {
//   try {
//     const tests = await MockTest.find();
//     res.status(200).json({
//       success: true,
//       count: tests.length,
//       data: tests,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };


import Test from "../models/Test.js";
import Question from "../models/Question.js";
import TestAttempt from "../models/TestAttempt.js";

export const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find()
      .select("-questions") // hide question IDs
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tests,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const questions = await Question.find({ testId: test._id })
      .select("-correctAnswer"); // 🔥 HIDE ANSWER

    res.status(200).json({
      success: true,
      test,
      questions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const submitTest = async (req, res) => {
  try {
    const { answers } = req.body;
    const testId = req.params.id;

    const questions = await Question.find({ testId });

    let score = 0;

    questions.forEach((q) => {
      const userAnswer = answers.find(
        (a) => a.questionId === q._id.toString()
      );

      if (userAnswer) {
        if (userAnswer.selectedOption === q.correctAnswer) {
          score += 4;
        } else {
          score -= 1;
        }
      }
    });

    const attempt = await TestAttempt.create({
      userId: req.user._id,
      testId,
      answers,
      score,
    });

    res.status(200).json({
      success: true,
      score,
      attemptId: attempt._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

