import React, {useState, useEffect } from 'react';
import axios from "axios";
import {TextField, Button, Typography} from '@material-ui/core';
import useStyles from './styles';


export default function Login() {
  const classes = useStyles();

  const [loggedIn, setState] = useState(false)

  function login() {
    return axios.post('/login')
    .then((res)=> {
      console.log(res[0])
    });
  };

  function autoLogin() {
    return axios.get("/login/1").then((res) => {
      console.log(res[0]);
      setState((prevState) => ({
        loggedIn: !prevState.loggedIn,
      }));
    });
  };

  return (
    <div>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={(event) => event.preventDefault()}>
         <Typography variant = "h4" className={classes.spread}>
           Login
         </Typography>
          <div>
            <TextField required id="standard-required" label="Email" className={classes.spread} />
          </div>
          <div>
            <TextField required id="standard-password-input" label="Password" className={classes.spread} 
            type="password" autoComplete="current-password" />
          </div>
          <div>
            <Button variant="contained" color="primary" className = {classes.spread} onSubmit={login}>
              Submit
            </Button>
          </div>
          <div>
            <Button variant="contained" color="primary" className = {classes.spread} onClick={autoLogin}>
              Auto-Login
            </Button>
          </div>
        </form> 
    </div>
  )
}  
        
