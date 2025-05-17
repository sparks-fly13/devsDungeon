import mongoose from "mongoose";
import 'dotenv/config'

const url=process.env.Database_Url;

export const connectDB=async()=>{
    try {

        await mongoose.connect(url)
        console.log("\n Database connected")
        
    } catch (error) {
        console.log("Error in connection of mongo db=",error)
    }
}