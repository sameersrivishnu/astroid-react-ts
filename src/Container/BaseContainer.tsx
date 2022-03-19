import React from "react";
import TopBar from "../Components/TopBar/TopBar";
import Asteroid from "./Asteroid";
/**
 * Base Component / Dashboard
 */
export default function BaseContainer() {
  return (
    <React.Fragment>
      <TopBar />
      <Asteroid />
    </React.Fragment>
  );
}
