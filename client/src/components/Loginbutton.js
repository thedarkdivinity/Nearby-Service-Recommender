import React from 'react';
import {useAuth0} from '@auth0/auth0-react';
import { Button } from '@material-ui/core';

const Loginbutton = () => {
    const {loginWithRedirect,isAuthenticated}=useAuth0();

    return (
        <>
        {!isAuthenticated && (
            <Button variant="contained" color="secondary"
       onClick={()=>loginWithRedirect()}
       >login</Button>
        )}
       </>
    )
}

export default Loginbutton
