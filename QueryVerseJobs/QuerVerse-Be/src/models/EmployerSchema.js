import mongoose from "mongoose"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import 'dotenv/config'

const EmployerSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    companyname:{
        type:String,
        required:true,
        unique:true
    },
    fname:{
        type:String,
        required:true,

    },
    lname:{
        type:String,
        required:true
    },
    founded:{
        type:String
    },
    phone:{
        type:Number
    },
    website:{
        type:String,
        required:true,
        unique:true,
    },
    twitter:{
        type:String
    },
    facebook:{
        type:String
    },
    instagram:{
        type:String
    },
    linkedin:{
        type:String
    },
    address:{
        type:String
    },
    description:{
        type:String
    },
    jobsoffered:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
        }
    ],

},{timestamps:true});

EmployerSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

EmployerSchema.post("save", async function (doc){

    if (this.isModified("username")){
        try {
            //transporter
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                //port: 465,
                secure: true,
                auth:{
                    user:process.env.Mail_user,
                    pass:process.env.Mail_password
                }
            })
    
            //send mail
            let info=await transporter.sendMail(
                {
                from:"Job Board",
                to:doc.email,
                subject:"Account Created in Job Board",
                html:`<h2>Thank You for beliving in us </h2> <h3>Congratulations </h3><p>Welcome to our community! We're thrilled to have you join us. Your account is now ready for exploration. Feel free to dive in and discover all that awaits. Should you need any assistance, don't hesitate to reach out. Here's to an exciting journey ahead with us! </p><p>Wishing you a bright future and prosperity in your business ahead.</p>`
            })
            console.log("info= ",info)
            } catch (error) {
                console.log("Error occured in the sending mail section =",error)
            }
    }})
    




export const Employer=mongoose.model("Employer",EmployerSchema)