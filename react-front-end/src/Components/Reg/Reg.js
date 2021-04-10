import React from 'react';
import {TextField, Button, Typography} from '@material-ui/core';
import useStyles from './styles';
export default function Reg() {
  const classes = useStyles();

  return (
    <div>
        <form className={classes.root} noValidate autoComplete="off">
         <Typography variant = "h4" className={classes.spread}>
           Registration
         </Typography>
          <div>
            <TextField required id="standard-required" label="Email" className={classes.spread} />
          </div>
          <div>
            <TextField id="standard-required" label="Name" className={classes.spread} />
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
        
