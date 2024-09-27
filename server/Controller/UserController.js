import User from '../Models/UserModels.js';
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs';
import pkg from 'cookie-parser';
const {cookieParser} = pkg;

export const user_register = async (req, res) => {
    try {
        const {full_name, email, phoneNumber, password, role} = req.body;

        // check all field not empty
        if(!full_name || !email || !phoneNumber || !password || !role ){
            return res.status(400).json({
                message: "Something is wrong!",
                success: false
            });
        }

        // check user already exist or not
        const user_exits = await User.findOne({email});
        if(user_exits){
            return res.status(400).json({
                message: "User already exist!",
                success: false
            })
        }

        // password bcrypt for password protection 
        const password_bcrypt = await bcryptjs.hash(password, 10);

        await User.create({
            full_name,
            email,
            phoneNumber,
            password: password_bcrypt,
            role,
        })

        return res.status(200).json({
            message:"Account created successfully.",
            success:true
        })

    } catch (error) {
        
    }
}

export const user_login = async (req, res) => {
    try {
        const {email, password, role} = req.body;

        // check all field not empty
        if(!email || !password || !role ){
            return res.status(400).json({
                message: "Something is wrong!",
                success: false
            });
        }

        // check user found or not
        const user_found  = await User.findOne({email});
        if(!user_found){
            return res.status(400).json({
                message: "Incorrect username or password!",
                success: false
            });
        }

        const isPasswordMatch = await bcryptjs.compare(password, User.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Password wrong!",
                success: false
            });
        }

        if(role === User.role){
            return res.status(400).json({
                message:"Account doesn't exist!",
                seccess:false
            })
        }

        User = {
            _id: User._id,
            full_name:User.full_name,
            email:User.email,
            phoneNumber:User.phoneNumber,
            role:User.role,
            profile:User.profile
        }

        const tokenData = {
            userId: User._id
        } 
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: '1d'})

        return res.status(200).cookieParser("token", token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json({
            message: `Welcome back ${User.full_name}`,
            User: User,
            seccess:true
        })


    } catch (error) {
        
    }
}


export const user_logout = async(req, res)=>{
    return res.status(200).cookieParser('token', '', {maxAge:0}).json({
        message: "Logged out successfully.",
        success:true
    })
}


export const user_update_profile = async (req, res)=>{
    try {
        const {full_name, email, phoneNumber, bio, skills} = req.body;

        // check all field not empty
        if(!full_name || !email || !phoneNumber || !bio || !skills ){
            return res.status(400).json({
                message: "Something is wrong!",
                success: false
            });
        }

        const skillsArray = skills.split(",");


        const userId = req.id;

        let user = await User.findOne(userId);
        if(!user){
            return res.status(400).json({
                message: "User no found",
                success:false
            })
        }

        user.full_name = full_name,
        user.email = email,
        user.phoneNumber = phoneNumber,
        user.profile.bio = bio,
        user.profile.skills = skillsArray

        await user.save();

        User = {
            _id: User._id,
            full_name:User.full_name,
            email:User.email,
            phoneNumber:User.phoneNumber,
            role:User.role,
            profile:User.profile
        }


        return res.status(200).json({
            message:"Profile updated.",
            success:true
        })

    } catch (error) {
        
    }
}