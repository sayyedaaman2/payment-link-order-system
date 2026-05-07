import express from 'express';
import corsMiddleware from './middleware/cors.middleware.js'
import globalErrorHandler from './middleware/error.middleware.js';
import loggerMiddleware from './middleware/logger.middleware.js'
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});



app.use(globalErrorHandler);

export default app;