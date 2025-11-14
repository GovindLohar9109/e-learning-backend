import express from "express";
import cors from "cors"
import SeedInitial from "./prisma/seed/seed.js";
import { PrismaClient } from "@prisma/client";
import router from "./routes/index.js";

const prisma = new PrismaClient(); // prisma client object used to intract with DB
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// routes
app.use("/", router);

app.get("/", async (req, res) => {
    const resp = await prisma.courses.findMany();
    res.send(resp);
})


app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
