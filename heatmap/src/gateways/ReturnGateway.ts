import axios from "axios";
import { ISurvey } from "../types/ISurvey";
import { Location } from "../types/Location";

export async function returnSurveysFromLocation(
  location: Location
): Promise<ISurvey[]> {
  const response = await axios.get(`/return?location=${location}`);
  if (response.status !== 200) {
    throw new Error("Error fetching surveys");
  }
  return response.data;
}
