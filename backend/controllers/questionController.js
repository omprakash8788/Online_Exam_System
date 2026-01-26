import Question from "../models/Question.js";

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
