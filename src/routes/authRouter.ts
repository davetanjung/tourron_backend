import express from "express";
import { authController } from "../controllers/authController";

// import {
//   registerUser,
//   authenticateUser,
//   logoutUser,
// } from "../controllers/authController";

const router = express.Router();

//router sleep note
export const sleepNoteRouter = express.Router();

// router.get("/api/sleepNote/:userId", SleepNoteController.getAllSleepNotes);
// router.post("/api/sleepNote", SleepNoteController.createSleepNote);
// router.put("/api/sleepNote", SleepNoteController.updateSleepNoteById);
// router.delete("/api/sleepNote/:id", SleepNoteController.deleteSleepNoteById);

router.post("/api/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);



export default router;