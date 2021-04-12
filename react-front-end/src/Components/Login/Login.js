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
    
    return axios.post('/login',
    {
      email: email,
      password: password
    }).then((res)=> {
      console.log(res)
      const email = res.data.email
      props.setEm(email)
      console.log(props.msg)
      console.log("########")
      props.msg === undefined ? history.push('/') : history.push("/checkout")
      
    })
    .catch(() => {
      //Failed registration or username already taken.
    })
    ;
  }
  function loginRoutes () {
    props.msg === undefined ? history.push('/') : history.push("/cart")
  
  }

  return (
    <div>
        <Button onClick = {loginRoutes} variant="contained" color="primary" className = {classes.spread}>
          Back
        </Button>
        <p>{props.msg}</p>
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
        
