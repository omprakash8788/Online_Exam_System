import Question from "../models/Question.js";
import MockTest from "../models/MockTest.js"
import Test from "../models/Test.js";



// UPLOAD QUESTIONS (BULK)
export const uploadQuestions = async (req, res) => {
  try {
    const questions = await Question.insertMany(req.body);

    res.status(201).json({
      success: true,
      message: "Questions uploaded successfully",
      data: questions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllQuestions = async (req, res) => {
  try {
    const questions = await MockTest.find();

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPublicTestQuestions = async (req, res) => {
  try {
    const testId = req.params.id;

    // 1️⃣ Find test
    const test = await Test.findById(testId)
      .select("title description duration totalMarks")
      .populate({
        path: "questions",
        select: "question options marks correctAnswer", // ❌ correctAnswer NOT sent
      });

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    res.status(200).json({
      success: true,
      data: test,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






// GET QUESTIONS BY TEST ID
export const getQuestionsByTestId = async (req, res) => {
  try {
    const { testId } = req.params;

    const questions = await Question.find({ testId });

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
