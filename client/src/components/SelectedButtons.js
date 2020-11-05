
import React from 'react'
import { Button } from '@material-ui/core'
const SelectedButtons = ({clicked}) => {
    return (
        <>
        <Button
        variant="contained"
        type="submit"
        
        color="primary" 
        style={{
          
          marginRight:"auto"
        }}
        >Rate</Button>  
        <Button
        variant="contained"
        color="primary" 
        onClick={clicked}
        style={{
          
          marginLeft:"auto"
        }}
        >View Rating</Button>
        </>
    )
}

export default SelectedButtons
