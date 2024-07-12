//import mongoose
const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.ATLAS_DB_URL;
//coonect to DB
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB connection success");
  })
  .catch((err) => console.log("Error in DB connect", err));


//create Trainer schema
const trainerSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, "Username is required, but missed"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  skills: {
    type: String,
    required: [true, "Skills is required"],
  },
  experience:{
    type: String,
    required: [true, "Experience is required"],
  },
  phno:{
    type: Number,
    required: [true, "Phno is required"],
  },
  profileImageUrl:String,

  
});

  
// Define Batch Schema
const batchSchema = new mongoose.Schema({
  id:{
    type: String,
  },
  cohortNumber: {
    type: String,
  },
  domain: {
    type: String,
  },
  roomNumber: {
    type: String,
  },
  no_ofEmployees: {
    type: Number,
  },
  trainer: 
    {
      type:String,
      ref:'Trainer'
    }
});




//coach schema
const coachSchema = new mongoose.Schema({
  id:String,
  username: {
    type: String,
    required: [true, "Username is required, but missed"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  userType:{
    type:String,
    enum:["trainer","coach"],
    default:"coach"
  },
  allocatedbatches:[batchSchema]  
  
});


//create Model(class) for the userSchema
const Trainer = mongoose.model("Trainer", trainerSchema);
const Batch = mongoose.model('Batch', batchSchema);
const Coach = mongoose.model("Coach",coachSchema);


//export User model
module.exports = {Trainer,Coach,Batch};


