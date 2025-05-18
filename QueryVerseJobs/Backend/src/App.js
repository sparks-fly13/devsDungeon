import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import session from "express-session"
import memorystore from 'memorystore';
import bodyParser from "body-parser";
import { Job } from "./models/JobSchema.js"
import nodemailer from "nodemailer"
import 'dotenv/config'

const app=express();
const MemoryStore = memorystore(session);

// app.use is used whenever we want to make any settings for our backend like allow taking json,url,cookies,cors allowing,etc or adding any middlewares

app.use(cors(
    {
        origin:process.env.Cors_origin,
        credentials:true
    }
))

//allowing cors to flow into and out of backend

app.use(express.json())             //allowing json data to flow into and out of backend
app.use(bodyParser.urlencoded({extended:true,limit:"1024kb"})) //allowing to extract data from the frontend
app.use(express.urlencoded({extended:true,limit:"1024kb"}))    //allowing url data to flow into and out of backend
app.use(express.static("public")) //allowing static data from public folder to flow into and out of backend
app.use(cookieParser());//allowing cookies to flow in backend and front-end
app.use(session({
    secret:process.env.CookieSecretKey,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:6 * 24 * 60 * 60 * 1000, //cookie will expire in 6 days
    },
    store: new MemoryStore({
        checkPeriod: 6 * 24 * 60 * 60 * 1000 // prune expired entries every 24h
    })
}))
app.use(express.static(process.cwd()+'/dist'))

app.get('/api/',(req,res)=>{
    //console.log("REached inside /api/ section backend")

    if( req.session.user){
        //console.log("found the user = ",req.session.user)
        return res.json({valid:true,user:req.session.user,category:req.session.category})
    }
    else{
        //console.log("I didnot find any data who is logged in")
        return res.send({valid:false})
    }
})

app.post('/api/logout', (req, res) => {
    console.log("I came into the logout section in the backend")
    req.session.destroy((err) => {
        if (err) {
          console.error('Error destroying session:', err);
          res.status(500).send('Error during logout');
        } else {
          // Clear the cookie
          console.log("I am ready to delete the cookie in the /api/login else section")
          res.clearCookie("connect.sid");
          res.status(200).end();
        }
      });
  });

  app.get('/api/getdata',async (req,res)=>{

    //console.log("................I ma in the getdata section.....................")

    try {
        const result= await Job.find();
        //console.log(result)
        res.send(result)
    } catch (error) {
        res.send("Error occured in the backend part of getdata")
        console.log("Error occured in the backend of getdata section = ",error)
    }
  })

  app.post('/api/getData/filters', async (req, res) => {
    console.log(".............................I am in /api/getData/filters section .........................")
    try {
        const { jobTypeSelected, categorySelected, experienceSelected, salarySelected } = req.body;
        //console.log(jobTypeSelected);

        let query = {};
        if (jobTypeSelected && jobTypeSelected.length > 0) {
            query.jobType = { $in: jobTypeSelected };
        }
        if (categorySelected && categorySelected.length > 0) {
            query.category = { $in: categorySelected };
        }
        if (experienceSelected && experienceSelected.length > 0) {
            const experienceSelectedInt = experienceSelected.map(sal => parseInt(sal));
            let min = Math.min(...experienceSelectedInt); // Finding the minimum salary 
            query.experienceRequired = { $gte: min };
        }
        if (salarySelected && salarySelected.length > 0) {
            const salarySelectedInt = salarySelected.map(sal => parseInt(sal));
            let min = Math.min(...salarySelectedInt); // Finding the minimum salary
            query.salaryOffered = { $gte: min }; // Using $lte to find salaries less than or equal to the minimum
        }
        const result = await Job.find(query);
        //console.log(result)
        res.json(result); // Assuming you want to send the result back to the client
    }
    catch (error) {
        console.log("Error occurred in the backend part of /api/getData/filters");
        console.log("Error:", error);
        res.status(500).send("Error occurred in the backend part of /api/getData/filters");
    }
});

app.post('/api/getJobData',async (req,res)=>{

    //console.log("..................I am in the get Job data using unique id section....................")
    const {jobID} = await req.body;
    //console.log(jobID)
        if(!jobID){
            return res.send({
                status: 422,
                message: "Please fill in all the required fields",
                
              });
        }

    try {
        const result=await Job.find({_id : jobID})
        //console.log(result)
        return res.json({
            status: 201,
            message: "Login Successfully",
            Data:result
          });
        
    } catch (error) {

        console.log("error occured in the /api/getJobData section Candidate in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
          });

    }
})

app.post('/api/getJobData/companyName',async(req,res)=>{
    //console.log(".............................I am in /api/getJobData/companyName section .........................")
    const {company} = req.body
    //console.log(company)
    if(!company){
        return res.send({
            status: 422,
            message: "Please fill in all the required fields",
            
          });
    }
    try {
        
        const result=await Job.find({companyName : company})
        res.send({
            status: 201,
            message: "Successfully fetched all data",
            Data:result,
        })
        
    } catch (error) {
        console.log("error occured in the getdata using company section Candidate in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
          });
    }
    
})

app.post('/api/getJobData/jobId',async(req,res)=>{
    console.log(".....................We are in /api/getJobData/jobId.................")
    const {jobID} = req.body
    console.log("Job ids =",jobID)
    if(jobID.length === 0){
        return res.send({
            status: 422,
            message: "Please fill in all the required fields",
            
          });
    }
    try {
        
        const dataArray = []; // Initialize an empty array to store fetched data

        for (let i = 0; i < jobID.length; i++) {
            const result = await Job.find({ _id: jobID[i] });
            dataArray.push(result); // Push fetched data into the array
        }

        res.status(201).send({
            status: 201,
            message: "Successfully fetched all data",
            Data: dataArray, // Send the array containing fetched data
        });
        
    } catch (error) {
        console.log("error occured in the getData/jobId section Candidate in backend =",error);
        
        return res.send({
            status: 500,
            message: "Internal Server Error",
          });
    }
})

app.post('/api/testemail',async (req,res)=>{
    const {email}=req.body

    console.log(email)
    try {
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
                from:'jobboardonly4uh@gmail.com',
                to:email,
                subject:"Account Created in Job Board",
                html:`<h2>Thank You for beliving in us </h2>
                 <h3>Congratulations </h3>
                <p>Welcome to our community! We're thrilled to have you join us. Your account is now ready for exploration.
                 Feel free to dive in and discover all that awaits. Should you need any assistance, don't hesitate to reach out. 
                 Here's to an exciting journey ahead with us! </p>`
            })

            console.log("Info = ",info)
        
    } catch (error) {
        console.log("Error occured in sending mail = ",error)
    }
    
})

app.post('/api/find', async (req, res) => {
    console.log("......I am in api/find........")
    const { input } = req.body;
    if (!input) {
        console.log("No data found")
        res.status(401).json({
            status: 401,
            message: "Fill the data"
        });
    } else {
        try {
            const regexPattern = new RegExp(input, 'i');
            const results = await Job.find({ jobTitle: regexPattern });
            console.log("Search results:", results);
            if (results.length === 0) {
                res.status(404).json({
                    status: 404,
                    message: "No data found"
                });
            } else {
                res.status(200).json({
                    status: 200,
                    message: "Successfully found your data",
                    result: results
                });
            }
        } catch (error) {
            console.log("Error happened !!!", error);
            res.status(500).json({
                status: 500,
                message: "Internal server error"
            });
        }
    }
});



//Now dividing the routes into different sections i.e. employer routes are moved to employer routes and candidate routes are moved to candidate routes

//importing the candidate router
import candidateRouter from "./routes/candidateRoutes.js";
//routing to candidate router
app.use("/api/candidate",candidateRouter)

//importing the employer router
import employerRouter from "./routes/employerRoutes.js"
//routing to Employer router
app.use("/api/employer",employerRouter)



export {app}