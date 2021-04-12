import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardMedia, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import useStyles from './styles';
import { useHistory } from "react-router-dom";





export default function Cart(props) {
  const history = useHistory();
  const classes = useStyles();
  
  function changeQ (sign, id) {
     props.changeQty(sign, id)
  }
  
  return (
    <div>
      <Button onClick = {() => {history.push('/')}} variant="contained" color="primary" className = {classes.spread}>
          Back
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <CardMedia className={classes.CardMedia} component="img" 
                  image={row.thumbnail_url}  title={row.name} />
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                   <Button onClick = {() => changeQ('+', row.id)}>+</Button>{row.qty}
                   <Button onClick = {() => changeQ('-', row.id)}>-</Button>
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}
