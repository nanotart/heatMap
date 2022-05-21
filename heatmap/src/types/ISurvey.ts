import { Score } from "./Score";
import { Location } from "./Location";

export interface ISurvey {
  _id: string;
  location: Location;
  foodScore: Score;
  timeScore: Score;
}
