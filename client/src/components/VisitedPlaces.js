import React,{useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Axios from 'axios';


//GETTING PLACES VISITED BY USERS WRT EMAIL ID
const VisitedPlaces = ({email}) => {
    const [visitedPlaces,setVisitedPlaces]=useState([]);
    
    useEffect(() => {
        fetchRatingsByProfile();
     }, [visitedPlaces]);
    const fetchRatingsByProfile=async()=>{
        try {
            const myRatings= await Axios.get(`http://localhost:5000/rateme/${email}`);
            setVisitedPlaces(myRatings.data);
            console.log(visitedPlaces);
        } catch (error) {
            console.log(error.message);
        }
       


      }

    
    return (
        <div>
        <TableContainer component={Paper}>
      <Table style={{width:"100%"}} aria-label="srating table">
        <TableHead>
          <TableRow>
            <TableCell style={{textAlign:"center"}}>Place</TableCell>
            <TableCell align="right">Rating</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
        {visitedPlaces.map((place)=>{
            return(

            
            <TableRow>
            <TableCell style={{textAlign:"center"}}  scope="row">
            {place.pname}
            </TableCell>
            <TableCell style={{textAlign:"center"}}  scope="row">
            {place.rating}
            </TableCell>
            </TableRow>
            )
        })}
        </TableBody>
     </Table>
     </TableContainer>
        </div>
    )
}

export default VisitedPlaces
