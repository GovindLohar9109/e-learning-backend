import express from "express";
import cors from "cors";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import path from "path"
import dotenv from "dotenv";
import { PrismaClient } from "./prisma/generated/client.js";
const prisma=new PrismaClient();

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;


app.use(
  cors({
    origin: process.env.HOST_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());


app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/",async (req,res)=>{
  
   const result=await prisma.course.findMany();
   res.send(result)
})

app.use("/", router);
app.listen(PORT, () =>
  console.log(`Server is running on http://0.0.0.0:${PORT}`),
);
export default app;