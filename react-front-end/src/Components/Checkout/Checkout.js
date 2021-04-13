import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@material-ui/core';
import useStyles from './styles';
import { useHistory, Link } from "react-router-dom";





export default function Checkout(props) {
  const history = useHistory();
  const classes = useStyles();
  console.log(history)
  console.log("%%%%%%%%%%%%%%%%%%%%")
  
  
  return (
    <div>
      <h1>Helllo</h1>
    </div>
  )
}
