import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const courseSchema = mongoose.Schema({
    course_name:{
        type: String,
        required: true
    },
    course_id:{
        type: String,
        required: true
    },
    course_description:{
        type: String,
        required: true
    },
    tutor:{
        type: String,
        required: true
    },
    history:{
        type: Array,
        default:[]
    },
    delivery_method:{
        type: String,
        required:true
    },
    maxium_capacity: {
        type: number,
        required:true
    },
    course_fee:{
        type: number,
        required:number
    },
    material_fee:{
        type: number,
        required:true
    },
    course_image:{
        type: String,
        required:false
    },
    course_start_date:{
        type: Date,
        required:true
    },
    course_end_date:{
        type: Date,
        required:true
    },
    courseStudents:{
        type: Array,
        default:[]
    },
    courseRequests:{
        type: Array,
        default:[]
    }
}, {
    timestamps:true
});


const Course = mongoose.model('Course', courseSchema);


export default Course;
