import express from "express"
const app=express();
import { Router } from "express"
import {Candidate} from "../models/CandidateSchema.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import 'dotenv/config'
import { upload } from "../middlewares/Multer.js";
import { UploadOnCloudinary } from "../utils/Cloudinary.js";

// Middleware for JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router=Router();

router.route("/Login").post(async (req,res)=>{

    console.log("I am in the backend login section")
    console.log(req.body)
    const {username,password}=await req.body;

    if (!username || !password) {
        return res.send({
            status: 422,
            message: "Please fill in all the required fields",
            
          });
      }

    try {
        const preCandidate = await Candidate.findOne({ username: username.toLowerCase() });
        //console.log(preCandidate)
        if (preCandidate && await bcrypt.compare(password, preCandidate.password)){ //password matched 

            req.session.user=preCandidate        //uss cookie mei konsa data hona chahiye yeh yahan se set kiya jaa skta hai
            req.session.category="candidate"     //uss cookie mei konsa data hona chahiye yeh yahan se set kiya jaa skta hai

            console.log("Cookie value which is set =",req.session.user)  //whether the cookie is storing the value or not 

            return res.json({
                status: 201,
                message: "Login Successfully",
                user:req.session.user,
              });
        }
        else{ //password doesn't matched

            console.log("Candidate is not existing on this username & Password")
            return res.send({
                status: 407,
                message: "Username & Password doesn't matches with any of the existing Candidate",
                
              });
        }
    } catch (error) {
        console.log("error occured in the Login section Candidate in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
          });
    }
})

router.route("/Signup").post(async (req,res)=>{

    console.log("............I am at Signup section of Candidate.............")
    console.log(req.body)
    const {username,email,password,confirmpassword,fname,lname}=req.body;

    if (!username || !email || !password || !confirmpassword || !fname || !lname) {
        return res.send({
            status: 422,
            message: "Please fill in all the required fields",
            
          });
      }

    try {

        const preCandidate = await Candidate.findOne({ username: username.toLowerCase() });
        const preCandidate1= await Candidate.findOne({ email: email.toLowerCase() })

        if(preCandidate){
            console.log("Already a Candidate is existing username")
            return res.send({
                status: 407,
                message: "Already an existing Candidate with this username",
                
              });
        }
        else if(preCandidate1){
            console.log("Already a Candidate is existing email")
            return res.send({
                status: 407,
                message: "Already an existing Candidate with this email",
                
              });
        }
        else{  //iska mtlb hai unique value diya hua hai
            const FinalCandidate=new Candidate({username,email,password,fname,lname});
            console.log("Candidate ka data ready hai dekhlo" + FinalCandidate);

            const storedData = await FinalCandidate.save();

            //transporter
            let transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port:465,
                auth:{
                    user:process.env.Mail_user,
                    pass:process.env.Mail_password
                }
            })

            //send mail
            let info=await transporter.sendMail({
                from:process.env.Mail_user,
                to:email,
                subject:"Account Created in Job Board",
                html:`<h2>Thank You for beliving in us </h2> <h3>Congratulations </h3><p>Welcome to our community! We're thrilled to have you join us. Your account is now ready for exploration. Feel free to dive in and discover all that awaits. Should you need any assistance, don't hesitate to reach out. Here's to an exciting journey ahead with us! </p><p>Wishing you a bright career ahead.</p>`
            })
            
            return res.send({
                status: 201,
                message: "Account created successfully",
                
              });
            
        }
    } catch (error) {
        console.log("error occured in the signup of candidate in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
            
          });
    }
})
router.route("/Dashboard/Profile").post(upload.single('File') ,  async (req, res) => {
    console.log(".....................I am at candidate Profile backend of candidate.................");
    console.log("File path We got it from multer = ",req.file)
    console.log("req.body =",req.body)
    let resumePath="";
    try {
        const { user, description, gender, phone, linkedin, twitter, facebook, instagram, address,dateOfBirth } = await req.body;
        //console.log("This is what we got from the frontend =",{ user, description, gender, phone, linkedin, twitter, facebook, instagram, address,dateOfBirth })
        
        if(req.file){
                const filepath = req.file.path;
                console.log("we have the filepath =",filepath)
                if(filepath !== null){
                    try {
                        const resultfromcloudinary=await UploadOnCloudinary(req.file.path)
                        console.log("..........We are back in /Dashboard/Profile.......... ")
                        console.log("Data to be updated in resume path =",resultfromcloudinary)
                        resumePath=resultfromcloudinary;
                        
                    } catch (error) {
                        console.log("error found in /fileupload in cloudinary =",error)
                    }
                }
                //console.log("Data we got from fronteend =",req.body)
                // Create an object with the properties to update
                
        }

        console.log("File path we got it from cloudinary = ",resumePath)
        const updatedUserData = {
            description,
            gender,
            phone: parseInt(phone),
            linkedin,
            twitter,
            facebook,
            instagram,
            address,
            dateOfBirth,
            resumePath
        };
        

        console.log("Updated user data =",updatedUserData)

        // Find and update the candidate document by user._id
        const updatedCandidate = await Candidate.findOneAndUpdate(
            { "_id": user._id },
            {$set: {
                ...(updatedUserData.description && { "description": updatedUserData.description }),
                ...(updatedUserData.gender && { "gender": updatedUserData.gender }),
                ...(updatedUserData.phone && { "phone": updatedUserData.phone }),
                ...(updatedUserData.linkedin && { "linkedin": updatedUserData.linkedin }),
                ...(updatedUserData.twitter && { "twitter": updatedUserData.twitter }),
                ...(updatedUserData.facebook && { "facebook": updatedUserData.facebook }),
                ...(updatedUserData.instagram && { "instagram": updatedUserData.instagram }),
                ...(updatedUserData.address && { "address": updatedUserData.address }),
                ...(updatedUserData.dateOfBirth && { "dob": updatedUserData.dateOfBirth }),
                ...({ "resume": updatedUserData.resumePath })
            }},
            { new: true } // To get the updated document as a result
        );
        console.log("Updated in database =",updatedCandidate)
        res.send(updatedCandidate);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
router.route("/CandidateData").post(async (req,res)=>{
   // console.log("....................I am in Candidate Data section to fetch data of candidate...................")
    const {userID}=await req.body;
   // console.log(userID)

    try {
        const candidate = await Candidate.findOne({ _id : userID });
        //console.log("Got the data of candidate = ",candidate)
        res.send(candidate)
    }
    catch (error) {
        //console.log("error occured in the /candidateData section Candidate in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
          });
    }

    

});
router.route("/ApplicationSubmit").post(async (req, res) => {
    console.log("...........................Hi I am in the application submission route............................");
    const { jobDetail, userID } = req.body;
    console.log({ jobDetail, userID });

    if (!jobDetail || !userID) {
        return res.send({
            status: 422,
            message: "Please fill in all the required fields",
        });
    }

    try {
        // Find the candidate by userID and update their jobDetail
        const candidate = await Candidate.findOneAndUpdate(
            { _id: userID }, // Find candidate by userID
            { $addToSet: { applications: jobDetail } }, // Update jobDetail field
            { new: true } // Return the updated document
        );
        if (!candidate) {
            return res.send({
                status: 404,
                message: "Candidate not found"
            });
        }
        console.log("Candidate updated:", candidate);
        res.send({
            status:200,
            message:"Successfully submitted the application"});
    } catch (error) {
        console.error("Error occured in application submission = :", error);
        res.send({
            status:500,
            message:"Internal Server Error"});
    }
});


export default router;