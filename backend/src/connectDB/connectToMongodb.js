import mongoose from "mongoose";

const connectTOMongodb = async () => {
    try {
        await mongoose.connect("mongodb://0.0.0.0:27017/mernProject1");
        console.log("application is connected to databasesuccessfully.");
    } catch (error) {
        console.log(error.message)
    }
}

export default connectTOMongodb