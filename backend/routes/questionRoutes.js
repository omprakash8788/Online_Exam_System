import express from "express";
import {
  uploadQuestions,
  getQuestionsByTestId,
  getAllQuestions,
} from "../controllers/questionController.js";

const router = express.Router();
router.post("/", uploadQuestions);
router.get("/", getAllQuestions); 
router.get("/test/:testId", getQuestionsByTestId);

export default router;


