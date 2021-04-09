import React from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, } from '@material-ui/core';

export default function Nav() {
  return (
    <>
    <CssBaseline />
    <AppBar position= "relative">
      <Toolbar>
        <Typography variant= "h6">
            Logo   
        </Typography>
      </Toolbar>
    </AppBar>  
    </>
  )
}
