const express = require('express')
const userModel = require('../models/user.model')
const router = express.Router()


router.post('/register',async (req,res)=>{

    const {username,password}= req.body
    const user = await userModel.create({
        username,password
    })
    res.status(201).json({
        message:"User registered successfully",
        user
    })
})
router.post('/login', async (req,res)=>{
    const {username,password}= req.body
    //now check if user exists
    const user = await userModel.findOne({
        username:username
    })
    if(!user){
        return res.status(401).json({
            message : "user account not found [Invalid Username]"

        })
    }

    const isPasswordValid = password == user.password
    if(!isPasswordValid){
        return res.status(401).json({
            message : "Invalid Password"
        })
    }
    res.status(200).json({
        message : "Login Successful"
    })
} )

module.exports= router;