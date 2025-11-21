import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { PrismaClient } from "./prisma/generated/client.js";
const prisma=new PrismaClient();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "https://e-learning-frontend-chi.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// routes

app.get("/",async (req,res)=>{
   const result=await prisma.userRole.findMany();
   res.send(result)
})

app.use("/", router);
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`),
);
export default app;