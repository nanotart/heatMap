import dotenv from "dotenv";
import mongoConnection from "./config/mongo";
import surveyRouter from "./routes/survey";
import returnRouter from "./routes/return";
import express from "express";
import cors from "cors";

dotenv.config();
mongoConnection();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/survey", surveyRouter);
app.use("/return", returnRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
