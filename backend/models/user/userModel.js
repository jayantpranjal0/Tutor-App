import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    // history:{
    //     type: Array,
    //     default:[]
    // },
    // address:{
    //     type: String,
    //     required:false
    // },
    // image:{
    //     type: String,
    //     required:false
    // },
    // phone:{
    //     type: String,
    //     required:false
    // },
    // isStudent:{
    //     type: Boolean,
    //     required:true
    // },
    // isTutor:{
    //     type: Boolean,
    //     required:true
    // },
    // dob:{
    //     type: Date,
    //     required:false
    // }
}, {
    timestamps:true
});

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
});



const User = mongoose.model('User', userSchema);


export default User;
