import React from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, InputBase} from '@material-ui/core';
import   SearchIcon  from '@material-ui/icons/Search';

import useStyles from './styles'


export default function Nav() {
  const classes = useStyles();
  return (
    <>
    <CssBaseline />
    <AppBar position= "relative">
      <Toolbar>
        <Typography variant= "h6">
            Logo   
        </Typography>
        <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
      </Toolbar>
    </AppBar>  
    </>
  )
}
