import express from "express";
import cors from "cors"
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
import AuthController from "./controllers/auth.controller.js";
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.get("/refresh",AuthController.refresh);

// routes
app.use("/", router);
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
