import mongoose from "mongoose";



const connectiontoDatabase = async ()=>{
    try {
        if (!process.env.MONGOURL) {
            throw new Error("MONGOURL is not defined in environment variables");
        }
        
        await mongoose.connect(process.env.MONGOURL);
        console.log("CONNETD TO DB");
    } catch (err) {
        console.log(err);
    }
}

export default connectiontoDatabase;