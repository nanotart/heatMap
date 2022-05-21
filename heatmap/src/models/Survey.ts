import { model, Schema } from "mongoose";

const SurveySchema = new Schema({
  location: {
    type: String,
    required: true,
  },
  foodScore: {
    type: Number,
    required: true,
  },
  timeScore: {
    type: Number,
    required: true,
  },
  submittedTime: {
    type: Date,
    default: Date.now,
  },
});

export interface ISurvey {
  _id: string;
  location: string;
  foodScore: number;
  timeScore: number;
  submittedTime: Date;
}

const Survey = model<ISurvey>("Survey", SurveySchema);
export default Survey;
