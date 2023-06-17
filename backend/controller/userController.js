import asyncHandler from 'express-async-handler';
import User from '../models/user/userModel.js';
import generateToken from '../utils/generateToken.js';
/*
@desc : Auth User
route : POST /api/user/auth
@access : Public 
 */
const authUser = asyncHandler(async (req,res) =>{
    const {email,password} = req.body;
    // console.log(email)
    // console.log(password)
    const user=await User.findOne({ email });
    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id)
        
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });
    }
    else{
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

/*
@desc : Register User
route : POST /api/user/register
@access : Public 
 */
const registerUser = asyncHandler(async (req,res) =>{
    const {name,email,password} = req.body;
    const userExists=await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User Already Exists');
    }
    const user=await User.create({
        name,
        email,
        password
    });
    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });
    }else{
        res.status(400);
        throw new Error('Invalid User Data');
    }
});


/*
@desc : Logout user
route : POST /api/user/logout
@access : Public 
 */
const logoutUser = asyncHandler(async (req,res) =>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({"message":"User Logged Out"});
});

/*
@desc : Get User Profile
route : GET /api/user/profile
@access : Private
 */
const getUserProfile = asyncHandler(async (req,res) =>{
    const user = await User.findById(req.user._id);
    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        });
    }
    else{
        res.status(404);
        throw new Error('User Not Found');
    }

});

/*
@desc : Update User Profile
route : PUT /api/user/profile
@access : Private 
 */
const updateUserProfile = asyncHandler(async (req,res) =>{
    const user=await User.findById(req.user._id);
    
    if(user){
        user.name=req.body.name || user.name;
        user.email=req.body.email || user.email;
        if(req.body.password){
            user.password=req.body.password;
        }
        const updatedUser=await user.save();
        generateToken(res,updatedUser._id)
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
        });
    }
    else{
        res.status(404);
        throw new Error('User Not Found');
    }

    res.status(200).json({"message":"User Profile Updated"});
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,

}










/* 
@desc : This file contains all the user related controller functions
*/
