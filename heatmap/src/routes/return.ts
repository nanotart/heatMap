import { Router } from "express";
import Survey from "../models/Survey";

const returnRouter = Router();

returnRouter.get("/", async (req, res) => {
  const location = req.query.location;
  const surveys = await Survey.find({ location })
    .sort({ createdAt: -1 })
    .limit(5);
  res.send(surveys);
});

export default returnRouter;
