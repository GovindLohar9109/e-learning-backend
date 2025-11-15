import express from "express";
import cors from "cors"
import SeedInitial from "./prisma/seed/seed.js";
import { PrismaClient } from "@prisma/client";
import router from "./routes/index.js";


const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// routes
app.use("/", router);



app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
