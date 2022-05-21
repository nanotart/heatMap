import axios from "axios";
import { Location } from "../types/Location";
import { Score } from "../types/Score";

export async function addASurvey(
  location: Location,
  foodScore: Score,
  timeScore: Score
) {
  const response = await axios.post(`/survey`, {
    location,
    foodScore,
    timeScore,
  });
  if (response.status !== 200) {
    throw new Error("Error sending surveys");
  }
  return response.data;
}
