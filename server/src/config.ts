import dotenv from "dotenv"
dotenv.config()

const configKeys = {
    MONGO_DB_URL: process.env.DATABASE as string,
    JWT_KEY: process.env.JWT_KEY as string,
    PORT: process.env.PORT,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID as string,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN as string  ,
    TWILIO_NUMBER: process.env.TWILIO_NUMBER as string
}


export default configKeys
