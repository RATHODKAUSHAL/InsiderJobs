import mongoose from "mongoose";

const connetDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected"));

    await mongoose.connect(`${process.env.MONGO_URL}/job-portal`)
}

export default connetDB;