import { Typography } from '@material-ui/core'
import React from 'react'
import SelectedPlaceTable from './SelectedPlaceTable'

const ViewPlace = ({selectedPlace}) => {
    return (
        <div>
            <Typography variant="h4"
            style={{textAlign:"center"}}
            >{selectedPlace.title}</Typography>
           {console.log(selectedPlace)}
            <SelectedPlaceTable selectedPlace={selectedPlace}/>
        </div>
    )
}

export default ViewPlace
