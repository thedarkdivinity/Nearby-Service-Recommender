import { Typography } from '@material-ui/core'
import React from 'react'
import SelectedPlaceTable from './SelectedPlaceTable'
import Uploader from './Uploader'

const ViewPlace = ({selectedPlace}) => {
    return (
        <div>
            <Typography variant="h4"
            style={{textAlign:"center"}}
            >{selectedPlace.title}</Typography>
           {console.log(selectedPlace)}
            <SelectedPlaceTable selectedPlace={selectedPlace}/>
            <Uploader/>
        </div>
    )
}

export default ViewPlace
