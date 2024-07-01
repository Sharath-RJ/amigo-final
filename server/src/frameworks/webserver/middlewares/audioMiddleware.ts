import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import cloudinary from "../../../entities/cloudinaryConfig"

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "audio",
        format: async (req: any, file: any) => "wav", 
        public_id: (req: any, file: any) =>
            `${Date.now()}-${file.originalname}`,
        resource_type: "raw",
    } as any, 
})

const uploadAudio = multer({ storage: storage })

export default uploadAudio
