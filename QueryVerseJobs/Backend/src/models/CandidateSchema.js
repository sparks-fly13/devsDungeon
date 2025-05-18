import mongoose from "mongoose"
import bcrypt from "bcrypt";
import nodemailer from "nodemailer"
import 'dotenv/config'

const CandidateSchema= new mongoose.Schema({

    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    fname:{
        type:String,
        required:true,

    },
    lname:{
        type:String,
        required:true
    },
    dob:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    phone: {
        type: Number
      },
    gender:{
        type:String,
        enum:["Male","Female"]
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
    applications:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job"
        }
    ],
    description:{
        type:String
    },
    resume:{
        type:String
    }

},{timestamps:true});

// password hasing 
CandidateSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

CandidateSchema.post("save", async function (doc){

    if (this.isModified("applications")){
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
                subject:"Job Application Succesfully Submitted",
                html:` <h2>Congratulations Your has been succesfully submitted.</h2>
                <p>Thank you for applying for the posted position through Job Board. We appreciate your interest in this opportunity.</p>
                <p></p>
                <p>We have received your application and it is currently being reviewed by the hiring team . If your qualifications match the requirements of the position, we will reach out to you to discuss next steps.</p>
                <p>In the meantime, feel free to explore other job opportunities available on our platform.</p>
                <p>Should you need any assistance, don't hesitate to reach out. Here's to an exciting journey ahead with us! 
                </p><p>Wishing you a bright future ahead.</p>
                <h3>Thank You for beliving in us </h3>`
            })
            console.log("info= ",info)
            } catch (error) {
                console.log("Error occured in the sending mail section =",error)
            }
    }

    if(this.isModified("username")){
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
                html:`<h2>Thank You for beliving in us </h2> <h3>Congratulations </h3><p>Welcome to our community! We're thrilled to have you join us. Your account is now ready for exploration. Feel free to dive in and discover all that awaits. Should you need any assistance, don't hesitate to reach out. Here's to an exciting journey ahead with us! </p><p>Wishing you a bright future ahead.</p>`
            })
            console.log("info= ",info)
            } catch (error) {
                console.log("Error occured in the sending mail section =",error)
            }
    }


})


export const Candidate=mongoose.model("Candidate",CandidateSchema)