import express from "express";
import {
    createCourse,
    getAllCourses,
    getCourseById,
    getAllCoursesByStudentId,
    getAllCoursesByTutorId,
    applyCourse,
    applicationRequests,
    applicationResponse
  } from "../controller/courseController.js";
const router = express.Router();
import {protect} from "../middleware/authMiddleware.js";
  


router.route("/").get(getAllCourses);
router.route("/register").post(protect, createCourse);
// change the url to get by id in url
router.route("/getcourse/:id").get(protect, getCourseById);
router.route("/tutor/:id").get(protect, getAllCoursesByTutorId);
router.route("/apply").post(protect, applyCourse);
router.route("/requests/:id").get(protect, applicationRequests).put(protect, applicationResponse);

export default router;
