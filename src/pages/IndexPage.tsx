//
// This is the IndexPage.tsx file
//

import React, { useEffect, useState } from "react"

import Controls from "./../components/controls"
import Table from "./../components/table"

export interface IIndexPageProps {}

const IndexPage: React.FunctionComponent<IIndexPageProps> = (props) => {

  // state variables


  // return the JSX
  return (
    <div className={"index-container"}>
      
      <Controls />

      <Table />

    </div>
  )

}

export default IndexPage





