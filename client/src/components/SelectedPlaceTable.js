import React, { useEffect ,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const SelectedPlaceTable=({selectedPlace})=> {
  const classes = useStyles();
  const [phone,setPhone]=useState(0);
useEffect(()=>{

if( selectedPlace.contacts!=undefined && selectedPlace.contacts[0].phone!=undefined && selectedPlace.contacts[0].phone[0].value!=undefined){
    var check =selectedPlace.contacts[0].phone[0].value; 
    setPhone(check)
}
},[]);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell align="right">Details</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow >
              <TableCell component="th" scope="row">
                <b>distance</b>
              </TableCell>
              <TableCell align="right">{selectedPlace.distance}</TableCell>
             
            </TableRow>

            <TableRow >
              <TableCell component="th" scope="row">
                <b>Address</b>
              </TableCell>
              <TableCell align="right">{selectedPlace.address.label}</TableCell>
             
            </TableRow>
            <TableRow >
            <TableCell component="th" scope="row">
              <b>Phone</b>
            </TableCell>
            
            {phone && (
                <TableCell align="right">{phone}</TableCell>
            )}
           
          </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default SelectedPlaceTable;