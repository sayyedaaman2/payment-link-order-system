import env from "./config/env.js";
import app from './app.js';
import {connectDB} from './lib/database.js';
import logger from './util/logger.js';
async function server(){
try{
    await connectDB();
    app.listen(env.PORT, () => {
        logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${env.PORT}`);
    });
}catch(err){
        logger.error(err, "Server failed to start");
    process.exit(1);
}
}

server();
