import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import router from "./routes";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});