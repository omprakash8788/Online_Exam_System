import express from "express";
import { createMockTest, getAllMockTests } from "../controllers/testController.js";

const router = express.Router();
router.post("/", createMockTest);    
router.get("/", getAllMockTests);  
export default router;

