import express from 'express';
import corsMiddleware from './middleware/cors.middleware.js'
import globalErrorHandler from './middleware/error.middleware.js';
import helmetMiddleware from './middleware/helmet.middleware.js';
import loggerMiddleware from './middleware/logger.middleware.js'
import webhookRoutes from './routes/webhook.routes.js';
import RootRoutes from './routes/index.js';
import limiter from './middleware/ratelimit.middleware.js';
import mongoose from 'mongoose';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
const app = express();

app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(limiter)
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);
app.use(
    "/api/v1/webhook/razorpay",
    express.raw({ type: "*/*" })
);


app.use(express.json());

app.use(loggerMiddleware);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get("/health", async (req, res) => {

    const dbState = mongoose.connection.readyState;

    /*
    |--------------------------------------------------------------------------
    | Mongoose Connection States
    |--------------------------------------------------------------------------
    | 0 = disconnected
    | 1 = connected
    | 2 = connecting
    | 3 = disconnecting
    |--------------------------------------------------------------------------
    */

    const dbStatus =
        dbState === 1
            ? "connected"
            : "disconnected";

    const healthStatus =
        dbState === 1
            ? 200
            : 503;

    return res.status(healthStatus).json({

        success: dbState === 1,

        uptime: process.uptime(),

        timestamp: new Date(),

        environment: process.env.NODE_ENV,

        database: dbStatus
    });
});

app.use("/api/v1/webhook", webhookRoutes);
app.use("/api/v1", RootRoutes);

app.use(globalErrorHandler);

export default app;