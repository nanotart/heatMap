//
// This is the table.tsx file
//

import React, { useEffect, useState } from "react"

import { get_data, data } from "../data/data"

import apple from "./../static/img/grayapple.svg"
import clock from "./../static/img/grayclock.svg"

export interface ITableProps {}

const temp_data = [
  {
    name: "Sharpe Refractory",
    rating: data.getRattyFoodScore,
    wait_time: data.getRattyTimeScore,
  },
  {
    name: "Andrews Commons",
    rating: data.getAndrewsFoodScore,
    wait_time: data.getAndrewsTimeScore,
  },
  {
    name: "Verney-Woolley",
    rating: data.getVdubFoodScore,
    wait_time: data.getVdubTimeScore,
  },
  {
    name: "Josiah's",
    rating: data.getJoeFoodScore,
    wait_time: data.getJoeTimeScore,
  },
  {
    name: "Ivy Room",
    rating: data.getIvyFoodScore,
    wait_time: data.getIvyTimeScore,
  },
  // {
  //   name: "Blue Room",
  //   rating: data.get,
  //   wait_time: 2.7
  // }
]

const Table: React.FunctionComponent<ITableProps> = (props) => {

  // state variables
  const [data, setData] = useState([])

  // ---------------------------------------------------------------------------

  useEffect(() => {

    // IIFE
    (async () => {

      // // get the data
      // let result = await get_data()

      // // set the data
      // setData(result)

    })()

  }, [])

  // ---------------------------------------------------------------------------

  const gen_items = () => {
    
    // go through the data
    return temp_data.map((item, index) => {
      //Sedong's Part (Things to consider: What columns to use when coloring and what value to cutoff? What colors to use?)
      // select the background color
      let color_class = item.wait_time < 2 ? "green-background" : item.wait_time < 3 ? "yellow-background" : "red-background"

      // return the JSX
      return (
        <div key={index} className={`index-table-data ${color_class}`}>
          <span>{item.name}</span>
          <p>{item.rating}</p>
          <p>{item.wait_time}</p>
          <button>Add</button>
        </div>
      )

    })

  }

  // ---------------------------------------------------------------------------

  // return the JSX
  return (
    <div className={"index-table"}>

      <div className={"index-table-header"}>
        <p className={"index-table-header-name"}>Name</p>
        <img className={"index-table-header-apple"} src={apple} alt={"apple"} />
        <img className={"index-table-header-clock"} src={clock} alt={"clock"} />
        <div className={"index-table-header-placeholder"}></div>
      </div>

      { gen_items() }

    </div>
  )

}

export default Table





