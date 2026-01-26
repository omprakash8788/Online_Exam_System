import MockTest from "../models/MockTest.js";
export const createMockTest = async (req, res) => {
  try {
    const test = await MockTest.create(req.body);
    res.status(201).json({
      success: true,
      data: test,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL MOCK TESTS
export const getAllMockTests = async (req, res) => {
  try {
    const tests = await MockTest.find();
    res.status(200).json({
      success: true,
      count: tests.length,
      data: tests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
