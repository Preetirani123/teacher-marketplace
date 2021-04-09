import React from 'react'
import {Typography, CssBaseline} from '@material-ui/core';
import useStyles from '../../Components/Nav/styles'

export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <footer className={classes.footer}>
      <CssBaseline />
        <Typography variant= "h6" align= "center" gutterBottom>
            Footer
        </Typography>
      </footer>
    </>
  )
}
