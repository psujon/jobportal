import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['students', 'recruiter'],
        required: true
    },
    profile:{
        bio:{type:string},
        skills:{type:string},
        resume:{type:string},
        resumeOriginName:{type:string},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
        profilePhoto:{
            type:string,
            default:''
        }
    }
}, {timestamps:true});

export const User = mongoose.model('User', userSchema);