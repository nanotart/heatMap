//
// This is the App.tsx file
//

import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { returnSurveysFromLocation } from "../src/gateways/ReturnGateway"

import IndexPage from "./pages/IndexPage"

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {

    const getRattySurvey = async () => {
        const data = await returnSurveysFromLocation("Ratty");
        console.log(data);
    };

  // Return the JSX
  return (
    //  Connect the application to the browser's URL
      <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} /> {/*home page*/}
      </Routes>
    </BrowserRouter>
          <button onClick={getRattySurvey}>CLICKME</button>
          </>
  )
}

export default App









