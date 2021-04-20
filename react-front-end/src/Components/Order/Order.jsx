import React from 'react';
import axios from 'axios';

import useStyles from './styles';
import Nav from '../Nav/Nav';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";
import {BrowserRouter as Router, Route, Link, Switch, useParams} from 'react-router-dom'
import { Button } from '@material-ui/core';

export default function Orders(props) {
  const classes = useStyles();
  const history = useHistory();

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
    return `${year}-${month}-${dt}`;
  }

  return (
    <>
    
    <div className={classes.root}>
      <Link to={`/order/${props.orderID}`}>
        <ListItem button className={props.className}>
          <ListItemText primary={`Order:`} secondary={`${props.orderID}`} />
          <ListItemText
            primary={`Purchased on:`}
            secondary={`${printDate(props.purchased)}`}
          />
          <ListItemText primary={`Amount:`} secondary={`${props.amount}`} />
        </ListItem>
      </Link>
    </div>
    </>
  );
}
