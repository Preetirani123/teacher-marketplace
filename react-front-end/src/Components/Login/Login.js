import React from 'react';
import {TextField, Button, Typography} from '@material-ui/core';
import useStyles from './styles';
export default function Login() {
  const classes = useStyles();

  return (
    <div>
        <form className={classes.root} noValidate autoComplete="off">
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
            <Button variant="contained" color="primary" className = {classes.spread}>
              Submit
            </Button>
          </div>
        </form> 
    </div>
  )
}  
        
