import { Router } from "express";
import Survey, { ISurvey } from "../models/Survey";

const surveyRouter = Router();

surveyRouter.post("/", async (req, res) => {
  const survey: ISurvey = req.body;
  const newSurvey = new Survey(survey);
  await newSurvey.save();
  res.send(newSurvey);
});

export default surveyRouter;
