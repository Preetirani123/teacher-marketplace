import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from '@material-ui/core';
import useStyles from './styles';
import { useHistory, Link } from "react-router-dom";
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
const {REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID} = process.env





export default function Checkout(props) {
  const history = useHistory();
  const classes = useStyles();
  console.log(history)
  console.log("%%%%%%%%%%%%%%%%%%%%")


  // function for email

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('REACT_APP_SERVICE_ID', 'REACT_APP_TEMPLATE_ID', e.target, 'REACT_APP_USER_ID')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  // Note please make the checkout form and pdf file name is Pdf and user name is name 
  //and call the sendEmail funtion in checkout form like this onSubmit={sendEmail}
  
  
  return (
    <div>
      <h1>Helllo</h1>
      
    </div>
  )
}
