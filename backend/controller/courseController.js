import asyncHandler from "express-async-handler";
import Course from "../models/course/courseModel.js";
import User from "../models/user/userModel.js";
import Application from "../models/course/applicationModel.js";
// @desc : Create Course
// route : POST /api/course/create
// @access : Private
const createCourse = asyncHandler(async (req, res) => {
  var {
    courseID,
    courseDescription,
    deliveryMethod,
    maximumCapacity,
    courseFee,
    materialFee,
    courseImage,
    courseStartDate,
    courseEndDate,
    courseName,
  } = req.body;
  courseStartDate = Date(courseStartDate);
  courseEndDate = Date(courseEndDate);
  const courseExists = await Course.findOne({ courseID });
  if (courseExists) {
    res.status(400);
    throw new Error("Course Already Exists");
  }
  const course = await Course.create({
    courseID,
    courseName,
    courseDescription,
    tutor: req.user._id,
    deliveryMethod,
    maximumCapacity,
    courseFee,
    materialFee,
    courseImage,
    courseStartDate,
    courseEndDate,
  });
  if (course) {
    res.status(201).json({
      _id: course._id,
      courseID: course.courseID,
      courseDescription: course.courseDescription,
      tutor: course.tutor,
      deliveryMethod: course.deliveryMethod,
      maximumCapacity: course.maximumCapacity,
      courseFee: course.courseFee,
      materialFee: course.materialFee,
      courseImage: course.courseImage,
      courseStartDate: Date(course.courseStartDate),
      courseEndDate: Date(course.courseEndDate),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Course Data");
  }
});

// @desc : Get All Courses
// route : GET /api/course/getAll
// @access : Public
const getAllCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
});



// @desc : Get Course By Id
// route : GET /api/course/getById
// @access : Public
const getCourseById = asyncHandler(async (req, res) => {
  console.log(req.params);
  const course = await Course.find({ courseID: req.params.id });
  if (course) {
    res.json(course);
  } else {
    res.status(404);
    throw new Error("Course Not Found");
  }
});

// @desc: Get All Courses By Tutor Id
// route: GET /api/course/getAllByTutorId
// @access: Private
const getAllCoursesByTutorId = asyncHandler(async (req, res) => {
  const courses = await Course.find({ tutor: req.user._id });
  res.status(201).json(courses);
});

// @desc: Get All Courses By Student Id
// route: GET /api/course/getAllByStudentId
// @access: Private
const getAllCoursesByStudentId = asyncHandler(async (req, res) => {
  const courses = await Course.find({ students: req.user._id });
  res.status(201).json(courses);
});

// @desc: Apply Course
// route: POST /api/course/apply
// @access: Private
const applyCourse = asyncHandler(async (req, res) => {
  const applicationRequest = {
    course: req.body.courseID,
    student: req.user._id,
  };
  const applicationExists = await Application.findOne(applicationRequest);
  console.log(applicationExists);
  if (applicationExists) {
    res.status(400);
    throw new Error("Already Applied");
  } else {
    const application = await Application.create({
      course: req.body.courseID,
      student: req.user._id,
      status: "Pending",
    });
    if (application) {
      res.status(200).json({ message: "Applied Successfully" });
    } else {
      res.status(400);
      throw new Error("Invalid Application Data");
    }
  }
});


const applicationResponse = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id);
  if(application){
    const course=await Course.findOne({courseID:application.course});
    if(course.tutor!=req.user._id){
        console.log(application.tutor," : ",req.user._id)
        res.status(401);
        throw new Error("Unauthorized");
    }
    else if (req.body.status === "Accepted") {
        // console.log("Accepted")
        const course = await Course.findOne({ courseID: application.course});
        if (course) {
          application.status = "Accepted";
          await application.save();
          res.json({ message: "Accepted Successfully" });
        } else {
          res.status(404);
          throw new Error("Course Not Found");
        }
      } else if (req.body.status === "Rejected") {
        application.status = "Rejected";
        await application.save();
        res.json({ message: "Rejected Successfully" });
      } else {
        res.status(404);
        throw new Error("Invalid Status");
      }
  }
});

// @dec: Get all courses by Tutor ID
// route: GET /api/course/getAllByTutorId
// @access: Private
const getAllTutorCoursesByTutorID = asyncHandler(async (req, res) => {
  const courses = await Course.find({ tutor: req.user._id });
  res.json(courses);
});

// @dec: Get all courses by Student ID
// route: GET /api/course/getAllByStudentId
// @access: Private
const getAllStudentCoursesByStudentID = asyncHandler(async (req, res) => {
  const courses = await Course.find({ students: req.user._id });
  res.json(courses);
});

// @desc: Get All Students By Course Id
// route: GET /api/course/getAllStudentsByCourseId
// @access: Private
const getAllStudentsByCourseId = asyncHandler(async (req, res) => {
    const students=await Application.find({course:req.params.id,status:"Accepted"});
    try {
        res.status(200).json(students?students:[]);
    } catch (error) {
        res.status(404).json({message:"Some error occurred"});
    }
        
});

export {
  createCourse,
  getAllCourses,
  getCourseById,
  getAllCoursesByTutorId,
  getAllCoursesByStudentId,
  applyCourse,
//   applicationRequests,
  applicationResponse,
  getAllStudentCoursesByStudentID,
  getAllTutorCoursesByTutorID,
  getAllStudentsByCourseId,
};







/* 
Useless function

// @desc: Course Requests
// route: POST /api/course/applicationRequests
// @access: Private
const applicationRequests = asyncHandler(async (req,res) =>{
    const applications=await Application.find({course:req.params.id});
    if(applications){
        res.json(applications);
    }else{
        res.json({});
    }
}
);
*/





/* 
For Future Use:
// // @desc: Update Course
// // route: PUT /api/course/update
// // @access: Private
// const updateCourse = asyncHandler(async (req,res) =>{
//     const course=await Course.findById(req.params.id);
//     if(course){
//         course.courseID=req.body.courseID || course.courseID;
//         course.courseDescription=req.body.courseDescription || course.courseDescription;
//         course.tutor=req.body.tutor || course.tutor;
//         course.deliveryMethod=req.body.deliveryMethod || course.deliveryMethod;
//         course.maximumCapacity=req.body.maximumCapacity || course.maximumCapacity;
//         course.courseFee=req.body.courseFee || course.courseFee;
//         course.materialFee=req.body.materialFee || course.materialFee;
//         course.courseImage=req.body.courseImage || course.courseImage;
//         course.courseStartDate=req.body.courseStartDate || course.courseStartDate;
//         course.courseEndDate=req.body.courseEndDate || course.courseEndDate;
//         const updatedCourse=await course.save();
//         res.json({
//             _id:updatedCourse._id,
//             courseID:updatedCourse.courseID,
//             courseDescription:updatedCourse.courseDescription,
//             tutor:updatedCourse.tutor,
//             deliveryMethod:updatedCourse.deliveryMethod,
//             maximumCapacity:updatedCourse.maximumCapacity,
//             courseFee:updatedCourse.courseFee,
//             materialFee:updatedCourse.materialFee,
//             courseImage:updatedCourse.courseImage,
//             courseStartDate:updatedCourse.courseStartDate,
//             courseEndDate:updatedCourse.courseEndDate
//         });
//     }else{
//         res.status(404);
//         throw new Error('Course Not Found');
//     }
// }
// );

// // @desc: Delete Course
// // route: DELETE /api/course/delete
// // @access: Private
// const deleteCourse = asyncHandler(async (req,res) =>{
//     const course=await Course.findById(req.params.id);
//     if(course){
//         await course.remove();
//         res.json({message:'Course Removed'});
//     }else{
//         res.status(404);
//         throw new Error('Course Not Found');
//     }
// }
// );

*/