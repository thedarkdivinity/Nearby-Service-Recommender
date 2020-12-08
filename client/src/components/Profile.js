import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

import Farm from './Farm';
import { Button } from '@material-ui/core';


const Profile = () => {
    const { user ,isAuthenticated}=useAuth0();


    return (
        <div>
       
      {isAuthenticated &&(
          <Farm/>
      )}
       </div>
    )
}

export default Profile;
