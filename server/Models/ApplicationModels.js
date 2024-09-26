
import mongoose from 'mongoose';

const ApplicationSchema = mongoose.Schema({    
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required:true
    },
    applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    status:{
        type:string,
        enum:['pending', 'accepted', 'rejected'],
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User',
        default:'pending'
    }
} , {timestamps:true});

export const Application = mongoose.model('Application', ApplicationSchema);