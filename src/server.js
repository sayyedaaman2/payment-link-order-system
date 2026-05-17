import env from "./config/env.js";
import app from './app.js';
import {connectDB} from './lib/database.js';
import logger from './util/logger.js';
import mongoose from "mongoose";

let server;
async function serverStart(){
try{
    await connectDB();
    server = app.listen(env.PORT, () => {
        logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${env.PORT}`);
    });
}catch(err){
        logger.error(err, "Server failed to start");
    process.exit(1);
}
}

serverStart();


//  Graceful Shutdown Handler

const gracefulShutDown = async (signal)=>{
    logger.info(
        `${signal} received. Shutting down server gracefully...`
    );

    server.close(async()=>{
        logger.info("HTTP server closed")
    })

    try{
        await mongoose.connection.close();

        logger.info("MongoDB connection closed")
        process.exit(0);
    }catch(error){
        logger.error(err, "Error while closing MongoDB");
        process.exit(1);
    }
}

// Process Signals

process.on("SIGINT",()=> gracefulShutDown("SIGINT"));

process.on("SIGTERM",()=> gracefulShutDown("SIGTERM"))