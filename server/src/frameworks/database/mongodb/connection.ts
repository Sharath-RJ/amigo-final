import mongoose from "mongoose"

const connectDB = async () => {
    try {
        // MongoDB connection URL
        const mongoUrl =  "mongodb+srv://Sharath:ktzZg1jp34FdGhAh@amigo.63tytsf.mongodb.net/?retryWrites=true&w=majority&appName=Amigo"

        // Connect to MongoDB
        await mongoose.connect(mongoUrl)

        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
        // Exiting the process or handle the error later
        process.exit(1)
    }
}

export default connectDB
