import { Request } from "express";
import multer from "multer";
import { BASE_URL } from "../global";
import fs from "fs";

/** define storage configuration of egg's image  */
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const uploadPath = `${BASE_URL}/public/save`; // Ensure "public/save" folder exists

        fs.access(uploadPath, fs.constants.F_OK, (err) => {
            if (err) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }
        });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename based on original filename and timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = `${file.fieldname}-${uniqueSuffix}.${file.originalname.split('.').pop()}`;
        cb(null, filename);
    },
});

const uploadFile = multer({ storage }); // Simplified configuration

export default uploadFile
