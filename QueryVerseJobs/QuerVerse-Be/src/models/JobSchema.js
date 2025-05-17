import mongoose from "mongoose"
import nodemailer from "nodemailer"
import 'dotenv/config'

const JobSchema=new mongoose.Schema({
    companyName:{
        type:String,
        required:true
      },
    jobTitle:{
        type:String,
        required:true
      },
    location:[
        {
            type:String,
            required:true
        }
    ],
    jobField:{
        type:String,
        required:true
      },
    experienceRequired:{
        type:Number,
        default:0,
        required:true
      },
    posts:{
      type:Number,
      default:1
    },
    jobType:{
        type:String,
        required:true,
        enum:["Full Time","Part Time","Temporary","Freelance"],
        default:"Full Time"
      },
    salaryOffered:{
        type:Number,
        required:true,
        default:0
      },
    jobDetail:{
        type:String,
        required:true
      },
    skills:[
        {
        type:String,
        required:true
        }
    ],
    category:{
        type:String,
        required:true,
        enum:["Purchasing","Accountancy","Health & Care","Engineering","Sales & Marketing"]
      },
},{timestamps:true})




export const Job=mongoose.model("Job",JobSchema)