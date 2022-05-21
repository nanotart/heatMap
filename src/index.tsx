//
// This is the index.tsx file
//

import React from "react"
import ReactDOM from "react-dom/client"
import axiosInit from "./config/axios"
import App from "./App"
import "./static/css/index.css"
import axios from "axios"

axiosInit();
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)









