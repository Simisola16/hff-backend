const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const mongoDbUri = process.env.Mongo_Uri || process.env.MONGODB_URI || process.env.mongo_uri;
const connectToDb = async ()=>{
    if (!mongoDbUri) {
        console.error("Error: Database connection string (Mongo_Uri) is not defined in Vercel environment variables.");
        return;
    }
    try {
        const connected = await mongoose.connect(mongoDbUri)
        if(connected){
            console.log("mongodb connected");      
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToDb