
import React from 'react'
import { Button } from '@material-ui/core'
const SelectedButtons = ({clicked}) => {
    return (
        <>
        <Button
        variant="contained"
        type="submit"
        
        color="secondary" 
        style={{
          
          marginRight:"auto"
        }}
        >Rate</Button>  
        <Button
        variant="contained"
        color="secondary" 
        onClick={clicked}
        style={{
          
          marginLeft:"auto"
        }}
        >View Rating</Button>
        
        </>
    )
}

export default SelectedButtons
