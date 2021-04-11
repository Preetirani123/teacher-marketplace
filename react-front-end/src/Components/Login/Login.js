import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import {TextField, Button, Typography} from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios'
export default function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function login(e) {
    e.preventDefault();
    console.log("papap")
    return axios.post('/login',
    {
      email: email,
      password: password
    }).then((res)=> {
      console.log(res)
      const email = res.data.email
      props.setEm(email)
      history.push("/")
    })
    .catch(() => {
      //Failed registration or username already taken.
    })
    ;
  }

  return (
    <div>
        <form className={classes.root} noValidate autoComplete="off" onSubmit = {login}>
         <Typography variant = "h4" className={classes.spread}>
           Login
         </Typography>
          <div>
            <TextField required id="standard-required" label="Email" className={classes.spread} 
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }} />
          </div>
          <div>
            <TextField required id="standard-password-input" label="Password" className={classes.spread} 
            type="password" autoComplete="current-password" 
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }} />
          </div>
          <div>
            <Button type = "submit" variant="contained" color="primary" className = {classes.spread}>
              Submit
            </Button>
          </div>
        </form> 
    </div>
  )
}  
        
