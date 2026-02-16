// import express from "express";
// import { createMockTest, getAllMockTests } from "../controllers/testController.js";

// const router = express.Router();
// router.post("/", createMockTest);    
// router.get("/", getAllMockTests);  
// export default router;


import express from "express";
import { getAllTests, getTestById} from "../controllers/testController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllTests);
router.get("/:id", protect, getTestById);

export default router;
