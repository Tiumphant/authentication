import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongodb is connected")
    }catch(err){
        console.log("error in connection ")
    }
}