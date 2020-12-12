import { Button } from '@material-ui/core'
import React from 'react'
import { useState } from 'react'

const Upload = () => {
    const [fileInputState,setFileInputState]=useState('');
    const [selectedFile,setSelectedFile]=useState('');
    const handleFileInputChange=(e)=>{

    }
    return (
        <div>
            <h1>Upload</h1>
            <form >
            <input type="file" onChange={handleFileInputChange}/>
            <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

export default Upload
