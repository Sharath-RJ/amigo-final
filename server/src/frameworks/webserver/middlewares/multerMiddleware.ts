import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../../../entities/cloudinaryConfig"

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "posts",
        format: async (req: any, file: any) => "png", // supports promises as well
        public_id: (req:any, file:any) => Date.now() + "-" + file.originalname,
    } as any, // Type assertion to bypass type checking
})

const upload = multer({ storage: storage })

export default upload
