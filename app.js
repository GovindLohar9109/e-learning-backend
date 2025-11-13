import express from "express";
import cors from "cors"
import SeedInitial from "./prisma/seed.js";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient(); // prisma client object used to intract with DB




const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
    const resp = await prisma.courses.findMany();
    res.send(resp);
})


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
