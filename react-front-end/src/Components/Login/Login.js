import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import {TextField, Button, Typography} from '@material-ui/core';
import useStyles from './styles';
export default function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  return (
    <div>
        <form className={classes.root} noValidate autoComplete="off">
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
            <Button variant="contained" color="primary" className = {classes.spread}>
              Submit
            </Button>
          </div>
        </form> 
    </div>
  )
}  
        
