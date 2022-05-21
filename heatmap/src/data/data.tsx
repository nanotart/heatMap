import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { returnSurveysFromLocation } from "../gateways/ReturnGateway";
import { ISurvey } from '../types/ISurvey';

//
// This is the data.tsx file
//
// const [diningHall, setDiningHall] = useState()
// const [foodRating, setFoodRating] = useState()
// const [waitTime, setWaitTime] = useState()
// //current link is just a placeholder, replace with actual link to survey data
// const [currentPageUrl, setcurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")

let rattyAvgFoodScore: number
let andrewsAvgFoodScore: number
let josAvgFoodScore: number
let vwAvgFoodScore: number
let ivyAvgFoodScore: number

let rattyAvgTimeScore: number
let andrewsAvgTimeScore: number
let josAvgTimeScore: number
let vwAvgTimeScore: number
let ivyAvgTimeScore: number


// get data
export const get_data = (): any => {

  // useEffect(()=> {
  //
  //   axios.get(currentPageUrl).then(res =>{
  //     setDiningHall(res.data.location)
  //     setFoodRating(res.data.foodScore)
  //     setWaitTime(res.data.timeScore)
  //   })
  //
  //
  // },[currentPageUrl])

  // return a Promise

    // error handling
    async function dataCompilation() {
      /**Justin's Part (fetch the data from MongoDB. Things to consider: What values do we actually want and how do we want to respresent them?
       * A 1-5 scale about something as arbritrary as a clock icon might not be the best indicator for wait times. How about a string? 
       * Or perhaps someone just puts in the number of minutes they waited and we make a scale based on that or just display the average value over the last 
       * 15 min interval.
       **/
      // getting survey data from each dining hall
      let rattyData: any = await returnSurveysFromLocation("Ratty")
      let andrewsData: any = await returnSurveysFromLocation("Andrews Commons")
      let josData: any = await returnSurveysFromLocation("Jo's")
      let vwData: any = await returnSurveysFromLocation("VDub")
      let ivyData: any = await returnSurveysFromLocation("Ivy Room")

      let rattyFoodScores: number[] = convertSurveyToArray(rattyData, true)
      rattyAvgFoodScore = takeAverage(rattyFoodScores)
      let andrewsFoodScores: number[] = convertSurveyToArray(andrewsData, true)
      andrewsAvgFoodScore = takeAverage(andrewsFoodScores)
      let josFoodScores: number[] = convertSurveyToArray(josData, true)
      josAvgFoodScore = takeAverage(josFoodScores)
      let vwFoodScores: number[] = convertSurveyToArray(vwData, true)
      vwAvgFoodScore = takeAverage(rattyFoodScores)
      let ivyFoodScores: number[] = convertSurveyToArray(ivyData, true)
      ivyAvgFoodScore = takeAverage(ivyFoodScores)

      let rattyTimeScores: number[] = convertSurveyToArray(rattyData, false)
      rattyAvgTimeScore = takeAverage(rattyTimeScores)
      let andrewsTimeScores: number[] = convertSurveyToArray(andrewsData, false)
      andrewsAvgTimeScore = takeAverage(andrewsTimeScores)
      let josTimeScores: number[] = convertSurveyToArray(josData, false)
      josAvgTimeScore = takeAverage(josTimeScores)
      let vwTimeScores: number[] = convertSurveyToArray(vwData, false)
      vwAvgTimeScore = takeAverage(rattyTimeScores)
      let ivyTimeScores: number[] = convertSurveyToArray(ivyData, false)
      ivyAvgTimeScore = takeAverage(ivyTimeScores)



      //function for taking average of an array of numbers 
      function takeAverage(set: number[]) {
        var i = 0, summ = 0
        while(i < set.length){
          summ = summ + set[i++]
        }
        return summ / set.length
      } 

      //converts dining hall data sets to number arrays 
      function convertSurveyToArray(data: any, isFoodScore: boolean) {
        let dataArray: number[] = []
        if(isFoodScore){
          for(const survey of data){
          dataArray.push(survey.foodScore)
        }
        } else {
          for(const survey of data){
            dataArray.push(survey.timeScore)
          }
        }

        
        return dataArray
      }


    }

    dataCompilation();
      // return the data
}

export class data {

  public static get getRattyFoodScore() {
    return rattyAvgFoodScore;
  }

  public static get getAndrewsFoodScore() {
    return andrewsAvgFoodScore;
  }

  public static get getVdubFoodScore() {
    return vwAvgFoodScore;
  }

  public static get getJoeFoodScore() {
    return josAvgFoodScore;
  }

  public static get getIvyFoodScore() {
    return ivyAvgFoodScore;
  }

  public static get getRattyTimeScore() {
    return rattyAvgTimeScore;
  }

  public static get getAndrewsTimeScore() {
    return andrewsAvgTimeScore;
  }

  public static get getVdubTimeScore() {
    return vwAvgTimeScore;
  }

  public static get getJoeTimeScore() {
    return josAvgTimeScore;
  }

  public static get getIvyTimeScore() {
    return ivyAvgTimeScore;
  }
}












