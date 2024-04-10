//import User model
const {Trainer} = require("../db");
const {Coach}=require("../db");


const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {cloudinary} =require('../Middlewares/cloudinaryUpload')
require('dotenv').config();
const fs=require("fs");


const getUsers = async (req, res) => {
  const {userType}=req.body;
  let usersList;
  if(userType==="trainer"){
    usersList = await Trainer.find();
  }else if(userType==="coach"){
    usersList = await Coach.find();
  }
  res.status(200).send({ message: "users", payload: usersList });
};


const getTrainers = async (req, res) => {
  let trainersList = await Trainer.find();
  res.status(200).send({ message: "trainers", payload: trainersList });
};



const getUserByUsername = async (req, res) => {

    const { username } = req.params; // Assuming username is passed as a parameter
    const {userType}=req.body;
    let user;
    if(userType==="trainer"){
      user = await Trainer.findOne({ username });
    }else if(userType==="coach"){
      user = await Coach.findOne({ username });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User found", payload: user });
};


//Create new User (Trainer)
const createUser = async (req, res) => {
  
  const user = JSON.parse(req.body.userObj);
  //check for existing user with same username
  let existingUser = await Trainer.findOne({ username: user.username });
  //user already existed
  if (existingUser !== null) {
    return res.status(200).send({ message: "User already existed" });
  }
  //if user not existed, then hash password
  const hashedPassword = await bcryptjs.hash(user.password, 6);
  //replace plain password with hashed pw
  user.password = hashedPassword;

  //upload img to cloudinary
  let result=await cloudinary.uploader.upload(req.file.path);
  
  //add cloudinary img url to user
  user.profileImageUrl=result.url;

  const newUser = await Trainer.create(user);

  fs.unlink(req.file.path,err=>{
    if(err){
      throw err
    }
  })
  
  res.status(201).send({ message: "User created", payload: newUser });
};


//create coach
const createCoach = async (req, res) => {
  //check for existing user with same username
  let existingCoach = await Coach.findOne({ username: req.body.username });
  //user already existed
  if (existingCoach !== null) {
    return res.status(200).send({ message: "Coach already existed" });
  }
  //if user not existed, then hash password
  const hashedPassword = await bcryptjs.hash(req.body.password, 6);
  //replace plain password with hashed pw
  req.body.password = hashedPassword;
  const newCoach = await Coach.create(req.body);
  res.status(201).send({ message: "Coach created", payload: newCoach });
};



//Trainer login  and  Coach login
const loginUser = async (req, res) => {
  //get user crdentials object from req
  const userCredentials = req.body;
  const {userType}=req.body;
  let user;
  //check username
  if(userType==="trainer"){
    user = await Trainer.findOne({ username: userCredentials.username });
  }
  else if(userType==="coach"){
    user = await Coach.findOne({ username: userCredentials.username });
  }
  
  //if invalid username
  if (user === null) {
    return res.status(200).send({ message: "Invalid username" });
  }

  //if username is found, compare passwords
  const result = await bcryptjs.compare( userCredentials.password, user.password);

  //if pasword not matched
  if (result === false) {
    return res.status(200).send({ message: "Invalid password" });
  }
  //Create jwt token and sign it
  const signedToken = jwt.sign({ username: user.username }, process.env.SECRET_KEY,{ expiresIn: "1d" });
  //delete password field from user
  // delete user.password;

  res.status(200).send({ message: "login success", token: signedToken, user:{username:user.username,email:user.email,skills:user.skills,experience:user.experience,phno:user.phno,userType:user.userType,profileImageUrl:user.profileImageUrl,allocatedbatches:user.allocatedbatches}  });
};


//export
module.exports = {getUsers,getTrainers,getUserByUsername,createUser,createCoach,loginUser};
