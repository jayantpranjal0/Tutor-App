import asyncHandler from 'express-async-handler';
import Course from '../models/course/courseModel.js';
import User from '../models/user/userModel.js';

// @desc : Create Course
// route : POST /api/course/create
// @access : Private
const createCourse = asyncHandler(async (req,res) =>{
    const {course_id,course_description,tutor,delivery_method,maxium_capacity,course_fee,material_fee,course_image,course_start_date,course_end_date} = req.body;
    const courseExists=await Course.findOne({course_id});
    if(courseExists){
        res.status(400);
        throw new Error('Course Already Exists');
    }
    const course=await Course.create({
        course_id,
        course_description,
        tutor,
        delivery_method,
        maxium_capacity,
        course_fee,
        material_fee,
        course_image,
        course_start_date,
        course_end_date
    });
    if(course){
        res.status(201).json({
            _id:course._id,
            course_id:course.course_id,
            course_description:course.course_description,
            tutor:course.tutor,
            delivery_method:course.delivery_method,
            maxium_capacity:course.maxium_capacity,
            course_fee:course.course_fee,
            material_fee:course.material_fee,
            course_image:course.course_image,
            course_start_date:course.course_start_date,
            course_end_date:course.course_end_date
        });
    }else{
        res.status(400);
        throw new Error('Invalid Course Data');
    }
});



// @desc : Get All Courses
// route : GET /api/course/getAll
// @access : Public
const getAllCourses = asyncHandler(async (req,res) =>{
    const courses=await Course.find({});
    res.json(courses);
});




// @desc : Get Course By Id
// route : GET /api/course/getById
// @access : Public

const getCourseById = asyncHandler(async (req,res) =>{
    const course=await Course.findById(req.params.id);
    if(course){
        res.json(course);
    }else{
        res.status(404);
        throw new Error('Course Not Found');
    }
}
);




// @desc: Update Course
// route: PUT /api/course/update
// @access: Private
const updateCourse = asyncHandler(async (req,res) =>{
    const course=await Course.findById(req.params.id);
    if(course){
        course.course_id=req.body.course_id || course.course_id;
        course.course_description=req.body.course_description || course.course_description;
        course.tutor=req.body.tutor || course.tutor;
        course.delivery_method=req.body.delivery_method || course.delivery_method;
        course.maxium_capacity=req.body.maxium_capacity || course.maxium_capacity;
        course.course_fee=req.body.course_fee || course.course_fee;
        course.material_fee=req.body.material_fee || course.material_fee;
        course.course_image=req.body.course_image || course.course_image;
        course.course_start_date=req.body.course_start_date || course.course_start_date;
        course.course_end_date=req.body.course_end_date || course.course_end_date;
        const updatedCourse=await course.save();
        res.json({
            _id:updatedCourse._id,
            course_id:updatedCourse.course_id,
            course_description:updatedCourse.course_description,
            tutor:updatedCourse.tutor,
            delivery_method:updatedCourse.delivery_method,
            maxium_capacity:updatedCourse.maxium_capacity,
            course_fee:updatedCourse.course_fee,
            material_fee:updatedCourse.material_fee,
            course_image:updatedCourse.course_image,
            course_start_date:updatedCourse.course_start_date,
            course_end_date:updatedCourse.course_end_date
        });
    }else{
        res.status(404);
        throw new Error('Course Not Found');
    }
}
);



// @desc: Delete Course
// route: DELETE /api/course/delete
// @access: Private
const deleteCourse = asyncHandler(async (req,res) =>{
    const course=await Course.findById(req.params.id);
    if(course){
        await course.remove();
        res.json({message:'Course Removed'});
    }else{
        res.status(404);
        throw new Error('Course Not Found');
    }
}
);



// @desc: Get All Courses By Tutor Id
// route: GET /api/course/getAllByTutorId
// @access: Private
const getAllCoursesByTutorId = asyncHandler(async (req,res) =>{
    const courses=await Course.find({tutor:req.params.id});
    res.json(courses);
}
);




// @desc: Get All Courses By Student Id
// route: GET /api/course/getAllByStudentId
// @access: Private
const getAllCoursesByStudentId = asyncHandler(async (req,res) =>{
    const courses=await Course.find({students:req.params.id});
    res.json(courses);
}
);




// @desc: Apply Course
// route: POST /api/course/apply
// @access: Private
const applyCourse = asyncHandler(async (req,res) =>{
    const course=await Course.findById(req.params.id);
    const user=await User.findById(req.user._id);
    if(course){
        if(course.students.includes(user._id)){
            res.status(400);
            throw new Error('You Already Applied For This Course');
        }else{
            course.students.push(user._id);
            user.courses.push(course._id);
            await course.save();
            await user.save();
            res.json({message:'Applied Successfully'});
        }
    }else{
        res.status(404);
        throw new Error('Course Not Found');
    }
}
);




// @desc: Course Requests
// route: POST /api/course/applicationRequests
// @access: Private
const applicationRequests = asyncHandler(async (req,res) =>{
    const course=await Course.findById(req.params.id);
    if(course){
        res.json(course.students);
    }else{
        res.status(404);
        throw new Error('Course Not Found');
    }
}
);
