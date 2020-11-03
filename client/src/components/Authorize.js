import { ButtonGroup } from "@material-ui/core";
import React from "react";
import Loginbutton from "./Loginbutton";
import Logoutbutton from "./Logoutbutton";
import Profile from "./Profile";

const Authorize = () => {
  return (
      <>
      <main>
    <ButtonGroup>
      <Loginbutton />
      
    </ButtonGroup>
    <Profile/>
    </main>
    </>
  );
};

export default Authorize;
