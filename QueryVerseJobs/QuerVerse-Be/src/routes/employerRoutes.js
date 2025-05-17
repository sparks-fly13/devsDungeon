import express from "express"
const app=express();
import { Router } from "express"
import {Employer} from "../models/EmployerSchema.js"
import { Job } from "../models/JobSchema.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import 'dotenv/config'

// Middleware for JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const router=Router();

router.route("/Login").post(async (req,res)=>{

    console.log(req.body)
    const {username,password}=await req.body;

    if (!username || !password) {
        return res.send({
            status: 422,
            message: "Please fill in all the required fields",
            
          });
      }

    try {
        const preEmployer = await Employer.findOne({ username: username.toLowerCase() });
        //console.log(preEmployer)
        if (preEmployer && await bcrypt.compare(password, preEmployer.password)){ //password matched

            req.session.user=preEmployer                  //uss cookie mei konsa data hona chahiye yeh yahan se set kiya jaa skta hai
            req.session.category="employer"               //uss cookie mei konsa data hona chahiye yeh yahan se set kiya jaa skta hai

            console.log("Cookie value =",req.session.user)  //whether the cookie is storing the value or not 

            return res.json({
                status: 201,
                message: "Login Successfully",
                user:req.session.user,
              });
        }
        else{    //password not matched
            console.log("Employer is not existing on this username & Password")
            return res.send({
                status: 407,
                message: "Username & Password doesn't matches with any of the existing employer",
                
              });
        }
    } catch (error) {
        console.log("error occured in the Login section Employer in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
          });
    }
})

router.route("/Signup").post(async (req,res)=>{

    console.log("............I am at Signup section of Employer...........")
    console.log(req.body)
    const {username,email,password,confirmpassword,companyname,fname,lname,website}=req.body;

    if (!username || !email || !password || !confirmpassword || !fname || !lname || !companyname || !website) {
        return res.send({
            status: 422,
            message: "Please fill in all the required fields",
            
          });
      }

    try {
        const preEmployer = await Employer.findOne({ username: username.toLowerCase() });
        const preEmployer1= await Employer.findOne({ email: email.toLowerCase() });
        const preEmployer2 = await Employer.findOne({ companyname: companyname });
        const preEmployer3= await Employer.findOne({ website: website });

        if(preEmployer){
            console.log("Already a Employer is existing username")
            return res.send({
                status: 407,
                message: "Already an existing Employer with this username",
                
              });
        }
        else if(preEmployer1){
            console.log("Already a Employer is existing email")
            return res.send({
                status: 407,
                message: "Already an existing Employer with this email",
                
              });
        }
        else if(preEmployer2){
            console.log("Already a Employer is existing company name")
            return res.send({
                status: 407,
                message: "Already an existing Employer with this company name",
                
              });
        }
        else if(preEmployer3){
            console.log("Already a Employer is existing website")
            return res.send({
                status: 407,
                message: "Already an existing Employer with this website",
                
              });
        }

        else{  //iska mtlb hai unique value diya hua hai
            const FinalEmployer=new Employer({username,email,password,companyname,fname,lname,website});
            console.log("Employer ka data ready hai dekhlo" + FinalEmployer);

            const storedData = await FinalEmployer.save();
            return res.send({
                status: 201,
                message: "Account created successfully",
                
              });
            
        }
    } catch (error) {
        console.log("error occured in the signup of Employer in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
            
          });
    }
    
})

router.route("/Dashboard/Profile").post(async (req, res) => {
    console.log("I am at employer Profile backend of employer");

    try {
        const {user , founded , phone , linkedin , twitter , facebook , instagram , address , description} = await req.body;
        console.log("Data we got from frontend =",req.body)
        // Create an object with the properties to update
        const updatedUserData = {founded , phone , linkedin , twitter , facebook , instagram , address , description };

        // Find and update the employer document by user._id
        const updatedEmployer = await Employer.findOneAndUpdate(
            { "_id": user._id },
            {$set: {
                ...(updatedUserData.description && { "description": updatedUserData.description }),
                ...(updatedUserData.phone && { "phone": updatedUserData.phone }),
                ...(updatedUserData.linkedin && { "linkedin": updatedUserData.linkedin }),
                ...(updatedUserData.twitter && { "twitter": updatedUserData.twitter }),
                ...(updatedUserData.facebook && { "facebook": updatedUserData.facebook }),
                ...(updatedUserData.instagram && { "instagram": updatedUserData.instagram }),
                ...(updatedUserData.address && { "address": updatedUserData.address }),
                ...(updatedUserData.founded && { "founded": updatedUserData.founded })
            }},
            { new: true } // To get the updated document as a result
        );
        console.log("Updated in database =",updatedEmployer)
        res.send(updatedEmployer);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.route("/EmployerData").post(async (req,res)=>{
    //console.log("....................I am in Employer Data section to fetch data of employer...................")
    const {userID}=await req.body;
    //console.log(userID)

    try {
        const employer = await Employer.findOne({ _id : userID });
        //console.log("Got the data of employer = ",employer)
        res.send(employer)
    }
    catch (error) {
        //console.log("error occured in the /EmployerData section employer in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
          });
    }
});

router.route("/postingjob").post(async (req,res)=>{

    console.log(".............I am in the posting job..................")
    const {company,jobtitle,jobdescription,field,selectedCategory,experience,salary,selectedType,locations,skills,post} = await req.body;

    console.log(req.body)
    //res.send("Came from backend work")

    if(!company || !jobtitle || !jobdescription || !field || !selectedCategory || !experience || !salary || !selectedType || !locations || !skills || !post){
        return res.send({
            status: 422,
            message: "Please fill in all the required fields",
            
          });
    }

    try {
        

        const job = new Job({
            companyName:company,
            jobTitle:jobtitle,
            jobDetail:jobdescription,
            jobField:field,
            category:selectedCategory,
            experienceRequired:experience,
            salaryOffered:salary,
            jobType:selectedType,
            location:locations,
            skills:skills,
            posts:post})

        console.log("Job ka data ready hai dekhlo" , job);

        const storedData = await job.save();
        const result=await Employer.find({companyname:company})
        console.log(result)

        //transporter
        let transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            //port:465,
            auth:{
                user:process.env.Mail_user,
                pass:process.env.Mail_password
            }
        })

        console.log("....Started to send mail......")

        //send mail
        let info=await transporter.sendMail({
            from:"Job Board",
            to:result[0].email,
            subject:"Successfully Posted a new Job in Job Board",
            html:`<h2>Congratulations You Have Posted a new Job !!!</h2>
            <p>Thank you for posting the job opening. We appreciate your trust in our platform to connect you with qualified candidates.</p>
            <p>Here's a brief summary of the job posting:</p>
            <p></p>
            <p>Job Title : ${jobtitle}</p>
            <p>Company Name : ${company}</p>
            <p>Salary Offered : ${salary}</p>
            <p>Offered Total Post : ${post}</p>
            <p>Description : ${jobdescription}</p>
            <p>Your job posting is now live on our platform and visible to our extensive network of job seekers. We will actively promote this opportunity to ensure maximum visibility.</p>
            <p>If you have any questions or need further assistance, please don't hesitate to contact us. Thank you once again for choosing Job Board for your hiring needs.</p>
            <h2>Thank You for beliving in us </h2>`
        })

        console.log(".....Mail sent......")

        return res.send({
            status: 201,
            message: "Job posted successfully",
            
          });

    } catch (error) {

        console.log("error occured in the employerRoutes in /postingjob of Employer in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
            
          });
    }
})

export default router;