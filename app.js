import express from 'express';
import corsMiddleware from './middleware/cors.middleware.js'
import globalErrorHandler from './middleware/error.middleware.js';
import helmetMiddleware from './middleware/helmet.middleware.js';
import loggerMiddleware from './middleware/logger.middleware.js'
import webhookRoutes from './routes/webhook.routes.js';
import RootRoutes from './routes/index.js';
import limiter from './middleware/ratelimit.middleware.js';
const app = express();

app.use(corsMiddleware);
app.use(helmetMiddleware);
app.use(limiter)
app.use(
    "/api/v1/webhook/razorpay",
    express.raw({ type: "*/*" })
);


app.use(express.json());
app.use(loggerMiddleware);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get("/health",(req,res)=>{
  res.status(200).json({
    success:true,
    uptime: process.uptime(),
    timestamp: new Date(),
    environment: process.env.NODE_ENV
  })
})

app.use("/api/v1/webhook", webhookRoutes);
app.use("/api/v1", RootRoutes);

app.use(globalErrorHandler);

export default app;