import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const courseSchema = mongoose.Schema({
    courseName:{
        type: String,
        required: true
    },
    courseID:{
        type: String,
        required: true
    },
    courseDescription:{
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
    deliveryMethod:{
        type: String,
        required:true
    },
    maximumCapacity: {
        type: String,
        required:true
    },
    courseFee:{
        type: String,
        required:true
    },
    materialFee:{
        type: String,
        required:true
    },
    courseImage:{
        type: String,
        required:false
    },
    courseStartDate:{
        type: Date,
        required:true
    },
    courseEndDate:{
        type: Date,
        required:true
    },
}, {
    timestamps:true
});


const Course = mongoose.model('Course', courseSchema);


export default Course;
