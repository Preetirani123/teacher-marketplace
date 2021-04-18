import React from 'react';
import axios from 'axios';

import useStyles from './styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { LensTwoTone } from '@material-ui/icons';

export default function Orders(props) {
  // function getOrderDetails(orderID) {
  //   axios.get(`/orderdetails/order/${orderID}`).then((res) => {
  //     setOrders((prevState) => ({
  //       ...prevState,
  //       ordDetails: res[0].data
  //     }));
  //   });
  // }

  function printDate(ISODate) {
    const date = new Date(ISODate);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();

    if (dt < 10) {
      dt = "0" + dt;
    }
    if (month < 10) {
      month = "0" + month;
    }
    return `${year}-${month}-${dt}`
  } 

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ListItem button>
        <ListItemText primary={`Order:`} secondary={`${props.orderID}`}/>
        <ListItemText primary={`Purchased on:`} secondary={`${printDate(props.purchased)}`}/>
        <ListItemText primary={`Amount:`} secondary={`${props.amount}`}/>
      </ListItem>
    </div>
  );
}
