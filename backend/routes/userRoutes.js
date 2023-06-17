import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controller/userController.js";
// import {
//   createCourse,
//   getAllCourses,
//   getCourseById,
//   getAllCoursesByStudentId,
//   getAllCoursesByTutorId,
//   applyCourse,
//   applicationRequests,
//   applicationResponse
// } from "../controller/courseController.js";
const router = express.Router();
import {protect} from "../middleware/authMiddleware.js";

router.post("/login", authUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, getUserProfile).put(protect, updateUserProfile);
// router.route("/profile/:id").get(protect, getUserProfile)


export default router;
