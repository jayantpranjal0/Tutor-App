import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
    course: {type: String, required: true},
    student: {type: 'String', required: true},
    // status: {type: String, required: true},
    status: {type: String, required: true, enum: ['Pending', 'Accepted', 'Rejected']},
}, {
    timestamps:true
});

const Application = mongoose.model('Application', applicationSchema);

export default Application;


// course: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Course'},
    // student: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},