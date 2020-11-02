import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import JSONPretty from 'react-json-pretty';
import Farm from './Farm';


const Profile = () => {
    const { user ,isAuthenticated}=useAuth0();
    return (
        <div>
       <JSONPretty data={user}>
       </JSONPretty>
      {isAuthenticated &&(
          <Farm/>
      )}
       </div>
    )
}

export default Profile
