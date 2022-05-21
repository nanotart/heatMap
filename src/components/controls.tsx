//
// This is the controls.tsx file
//

import React, { useEffect, useState } from "react"

import menu from "./../static/img/menugray.svg"
import map from "./../static/img/graymap.svg"

export interface IControlsProps {}

const Controls: React.FunctionComponent<IControlsProps> = (props) => {

  // state variables
  const [input, setInput] = useState("")

  // ---------------------------------------------------------------------------

  const handle_menu_click = () => {

  }

  // ---------------------------------------------------------------------------

  const handle_map_click = () => {

  }

  // ---------------------------------------------------------------------------

  // return the JSX
  return (
    <div className={"index-controls"}>

      <input className={"index-controls-search"} placeholder={"Search..."} value={input} onChange={(e) => setInput(e.target.value)} />

      <img className={"index-controls-menu"} src={menu} alt={"menu"} onClick={(e) => handle_menu_click()} />

      <img className={"index-controls-map"} src={map} alt={"map"} onClick={(e) => handle_map_click()} />

    </div>
  )

}

export default Controls





