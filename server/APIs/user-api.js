//create a Route(mini exp app)
const exp = require("express");
const router = exp.Router();
const {upload}=require('../Middlewares/cloudinaryUpload')


//get express-async-handler to handle async errors
const expressAsyncHandler = require("express-async-handler");

//import req handlers from Controller
const {getUsers,getTrainers,getUserByUsername,createUser,updateUser,removeUser,loginUser,createCoach} = require("../Controllers/user-controller");




// USERS RELATED API'S

//read all users
router.get("/users", expressAsyncHandler(getUsers));
//get trainers
router.get("/trainers",expressAsyncHandler(getTrainers));
//read user by username
router.get("/user/:username", expressAsyncHandler(getUserByUsername));

//create user
router.post("/user",upload.single('pic'), expressAsyncHandler(createUser));

//user login
router.post("/login", expressAsyncHandler(loginUser));
//update user
router.put("/user", expressAsyncHandler(updateUser));
//delete user
router.delete("/user/:username", expressAsyncHandler(removeUser));
//create coach
router.post('/coach',expressAsyncHandler(createCoach));



//export userApp
module.exports = router;
