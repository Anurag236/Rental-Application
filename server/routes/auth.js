const router = require("express").Router()
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/User");

/*Configuration Multer for file Upload*/
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads/");
    },
    filename: function(req,file,cb) {
        cb(null,file.originalname)
    }
})
const upload = multer({storage})
/*user register*/
router.post("/register",upload.single('profileImage'),async(req,res)=>{
    try{
        /*take all info from form*/
        const {firstName , lastName , email,password} = req.body
        /*upload file is available as req.file*/
        const profileImage = req.file;
        if(!profileImage){
            return res.status(400).send("No file Uploaded")
        }
        /* path to profile photo*/
        const profileImagePath = profileImage.path
        const existingUser  = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message: "User already exist!"})
        }
        /* Hass the password*/
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password,salt) 
        /* New User*/
        const newUser = new User({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            profileImagePath,
        })
        /*Save NewUser*/
        await newUser.save()
        /*Send a successfullmsg*/
        res.status(200).json({message: "User registered successfully",user: newUser})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Registration failed",error:err.message})
    }
});
/*User Login*/
router.post("/login" , async(req,res)=>{
    try{
        /*take info from form*/
       const {email,password} = req.body
       /*Check if user exist*/
       const user  = await User.findOne({email})
       if(!user){
           return res.status(409).json({message: "User doesnt exists!"})
       }
       /*Compare password*/
       const isMatch =await bcrypt.compare(password,user.password)
       if(!isMatch){
        return res.status(400).json({message:"Invalid Credential"})
       }
       /*Generate token*/
       const token = jwt.sign({id: user._id },process.env.JWT_SECRET)
       delete user.password
       res.status(200).json({token,user})
    }catch(err){
        console.log(err)
        res.status(500).json({error:err.message})
    }
})
module.exports=router;