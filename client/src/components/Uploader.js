import { Button } from '@material-ui/core';
import Axios from 'axios';
import React from 'react'
import { useState } from 'react'

const Uploader = () => {
    const [fileInputState,setFileInputState]=useState('');
    const [selectedFile,setSelectedFile]=useState('');
    const[previewSource,setPreviewSource]=useState();


    const uploadImage=(base64EncodedImage)=>{
        console.log(`THE BASE IS ${base64EncodedImage}`);
       Axios.post('http://localhost:5000/api/upload',{data: base64EncodedImage});



    }
    const previewFile=(file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreviewSource(reader.result);
        }
    }
    const handleUpload=(e)=>{
        const file= e.target.files[0];
        previewFile(file);



    }
    const handleSubmitFile=(e)=>{
        
        e.preventDefault();
        if(!previewSource) return;
        uploadImage(previewSource);
    }
    return (
        <div>
        <form onSubmit={handleSubmitFile} >
        <input type="file" name="image" onChange={handleUpload} value={fileInputState} />
        <br/>
      <Button style={{marginTop:"2em"}} type="submit" variant="contained" color="secondary">Upload My Image</Button>
        </form>
        {previewSource &&(
            <figure style={{
                display:"grid",
                placeItems:"center",
                marginTop:"1.4em"
            }}>
            <img src={previewSource} alt="selectedImage"
            style={{height:"300px",width:"70%"}}
            />
            </figure>
        )}
        </div>
    )
}

export default Uploader;
