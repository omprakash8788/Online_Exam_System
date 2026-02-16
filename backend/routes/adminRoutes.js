// import express from "express";
// import { createTestWithQuestions } from "../controllers/adminTestController.js";
// // import { protect, adminOnly } from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.post(
//   "/tests",
//   createTestWithQuestions
// );

// export default router;

import express from "express";
import { createTestWithQuestions,  updateTest,
  deleteTest,
  getTestAttempts,
  getTestAnalytics } from "../controllers/adminTestController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Post question 
router.post(
  "/tests",
  protect,
  adminOnly,
  createTestWithQuestions
);

// http://localhost:4000/api/admin/tests/69918ad4fe8e9f3e0ba5b8f2 - working 
// UPDATE TEST
router.put("/tests/:id", protect, adminOnly, updateTest);

//http://localhost:4000/api/admin/tests/69918ad4fe8e9f3e0ba5b8f2 - Working 
// DELETE TEST
router.delete("/tests/:id", protect, adminOnly, deleteTest);

// SEE ATTEMPTS
router.get("/tests/:id/attempts", protect, adminOnly, getTestAttempts);

// ANALYTICS
router.get("/tests/:id/analytics", protect, adminOnly, getTestAnalytics);

export default router;

