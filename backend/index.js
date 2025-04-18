import express, { json } from "express";
import connectTOMongodb from "./src/connectDB/connectToMongodb.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import cors from "cors"
import webUserRouter from "./src/routes/webUserRouter.js";
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

let expressApp = express();
expressApp.use(express.static("./public"))

expressApp.use(cors()) // always place cors at top
// cors enabales us to hit api form browser
expressApp.use(json())
connectTOMongodb()

expressApp.listen(8001, () => {
  console.log("express app is listening at port 8001");
});


expressApp.use("/web-Users", webUserRouter);

expressApp.use(errorMiddleware)



