import mongoose from "mongoose";
const connectToMongoDB= async()=>{
    mongoose.connection.on('connected',()=>{
        console.log("MongoDB is connected")
    })
    await mongoose.connect(`${process.env.MONGO_URI}/mocktest`);
}
export default connectToMongoDB;
