import express from "express";
import {
  uploadQuestions,
  getQuestionsByTestId,
  getAllQuestions,
  getPublicTestQuestions,
} from "../controllers/questionController.js";

const router = express.Router();
router.post("/", uploadQuestions);
router.get("/", getAllQuestions); 
// router.get("/test/:testId", getQuestionsByTestId);
router.get("/tests/:id/public", getPublicTestQuestions);


export default router;


