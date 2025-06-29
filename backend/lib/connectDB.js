import mongoose from "mongoose"

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongo_url);
        console.log("Mongo DB connected");
    } catch (err) {
        console.log(err);
    }
};

export default connectDB;