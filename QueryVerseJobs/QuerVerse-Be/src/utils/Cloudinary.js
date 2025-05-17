import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
import 'dotenv/config'
          
cloudinary.config({ 
  cloud_name: process.env.Coudinary_name, 
  api_key: process.env.Cloudinary_api_key, 
  api_secret: process.env.Cloudinary_api_secret_key 
});

const UploadOnCloudinary = async (localFilePath)=>{
    console.log("............We are in cloudinary..................")

    try {
        if(!localFilePath) return null

        //file path is present so we are uploading the file
        const result = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })
        //file is uploaded
        console.log("file is uploaded",result.url)
        fs.unlinkSync(localFilePath)
        return result.secure_url
    } catch (error) {

        fs.unlinkSync(localFilePath) //remove the data form the local path asthe required operation has been failed
        return null;
        
    }
}

export {UploadOnCloudinary}