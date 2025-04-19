import mongoose from "mongoose";

// "mongodb://0.0.0.0:27017/mernProject1";

const connectTOMongodb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("application is connected to databasesuccessfully.");
    } catch (error) {
        console.log(error.message)
    }
}

export default connectTOMongodb