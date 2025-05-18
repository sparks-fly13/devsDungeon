import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        console.log("............We are in Multer Section............")
      console.log("Received file in multer:", file);
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({ storage,})