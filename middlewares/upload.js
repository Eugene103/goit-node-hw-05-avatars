import multer from "multer";
import path from "path"
import HttpError from "../helpers/HttpError.js";

const destination = path.resolve("temp")

const storage = multer.diskStorage({
    destination,
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix + '_' + file.originalname)
    }
})

const limits = {
    fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, cb) => {
    const extention = req.originalname.split(".").pop();
    if (extention === "exe") {
        cb(HttpError(400, ".exe not valid extention"))
    }
}

const ulpoad = multer({
    storage, 
    limits, 
    // fileFilter,
})

export default ulpoad