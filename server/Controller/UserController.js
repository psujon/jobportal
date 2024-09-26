import User from '../Models/UserModels.js';
import bcryptjs from 'bcryptjs';

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
                message: "Something is wrong!",
                success: false
            });
        }

        const isPasswordMatch = await bcryptjs.compare(password, User.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message: "Something is wrong!",
                success: false
            });
        }

    } catch (error) {
        
    }
}