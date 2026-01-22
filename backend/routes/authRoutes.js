// const express = require('express');
import express from "express"
// const authController = require('../controllers/authController');
import authController from "../controllers/authController.js"
import {protect} from "../middleware/verifyToken.js"

const router = express.Router();


router.post('/signup', authController.signup);
router.post("/login", authController.login);
router.put("/users/:id", authController.updateUser);
router.get("/me", protect, authController.getMe);
router.post("/logout", protect, authController.logout);


// module.exports = router;
export default router;