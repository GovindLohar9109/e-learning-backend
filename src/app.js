import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import router from './routes/index.js';
const PORT = process.env.PORT || 8000;
const app = express();
app.use(helmet());
app.use(xss());
app.use(cors()
);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: 'Too many requests, try again later.',
});
app.use(limiter);
app.use(express.json());
app.use('/', router);


app.listen(PORT,()=>console.log("Server is running"));