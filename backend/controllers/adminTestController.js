import Test from "../models/Test.js";
import Question from "../models/Question.js";

import TestAttempt from "../models/TestAttempt.js";

export const createTestWithQuestions = async (req, res) => {
  try {
    const { test, questions } = req.body;

    // 1️⃣ Create Test
    const newTest = await Test.create({
      ...test,
      createdBy: req.user._id
    });

    // 2️⃣ Attach testId to each question
    const formattedQuestions = questions.map(q => ({
      ...q,
      testId: newTest._id
    }));

    // 3️⃣ Insert Questions
    const savedQuestions = await Question.insertMany(formattedQuestions);

    // 4️⃣ Store question IDs in test
    newTest.questions = savedQuestions.map(q => q._id);
    await newTest.save();

    res.status(201).json({
      success: true,
      message: "Test & questions created successfully",
      data: {
        test: newTest,
        questions: savedQuestions
      }
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


export const updateTest = async (req, res) => {
  try {
    const updatedTest = await Test.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTest) {
      return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({
      success: true,
      message: "Test updated successfully",
      data: updatedTest,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    // delete related data
    await Question.deleteMany({ testId: test._id });
    await TestAttempt.deleteMany({ testId: test._id });
    await test.deleteOne();

    res.status(200).json({
      success: true,
      message: "Test and related data deleted",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};



export const getTestAttempts = async (req, res) => {
  try {
    const attempts = await TestAttempt.find({
      testId: req.params.id,
    })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      totalAttempts: attempts.length,
      data: attempts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getTestAnalytics = async (req, res) => {
  try {
    const attempts = await TestAttempt.find({
      testId: req.params.id,
    });

    if (attempts.length === 0) {
      return res.status(200).json({
        success: true,
        attempts: 0,
        avgScore: 0,
        maxScore: 0,
        minScore: 0,
      });
    }

    const scores = attempts.map((a) => a.score);
    const total = scores.reduce((a, b) => a + b, 0);

    res.status(200).json({
      success: true,
      attempts: attempts.length,
      avgScore: total / attempts.length,
      maxScore: Math.max(...scores),
      minScore: Math.min(...scores),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
