import React from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, InputBase, Button, IconButton, Badge} from '@material-ui/core';
import   SearchIcon  from '@material-ui/icons/Search';
import useStyles from './styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios'

export default function Nav(props) {
  const history = useHistory();

  function logout(e) {
    e.preventDefault();
    props.setEm("");
    return axios.post('/logout').then((res) => {
      console.log(res)
      history.push('/')

    }).catch((e) => {
      console.log(e)
    })
    
  }

  const classes = useStyles();
  return (
    <>
    <header>
    <CssBaseline />
    <AppBar position= "relative">
      <Toolbar>
        <div className={classes.navLogo}>
        <Typography variant= "h6" className={classes.navLogotext}>
           <LocalLibraryIcon /> Smarter Teacher  
        </Typography>
        </div>
        <div className={classes.navSearch}> 
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
         </div>
         <div className={classes.navRight}>
            <div className={classes.navRight_1}>
            <Typography variant= "h6">

            
              {props.u_email === "" ? 
              <div className = {classes.logOut1}>
                <Link to = "/login" className={classes.logOut2}>Login</Link>
                <Link to = "/register" className={classes.logOut2}>SignUp</Link>
                <Link to = "/cart" className={classes.navLink}>
                    <div className={classes.grow} />  
                    
                      <IconButton aria-label="show cart item" color="inherit">
                        <Badge badgeContent={props.count} color="secondary">
                          <ShoppingCartIcon />
                        </Badge> 
                      </IconButton>
                    
  
                </Link>
              </div>  
              : 
              <div>         
                  <form className={classes.logOut1} noValidate autoComplete="off" onSubmit={logout}>
                      <Link to = "/login" className={classes.logOut2}>{props.u_email}</Link>
                      <Button type = "submit" variant="contained" color="primary" className = {classes.spread}>

                        Logout
                      </Button>
                      <Link to = "/cart" className={classes.navLink}>
                          <div className={classes.grow} />
                          <div className={classes.button}>
                            <IconButton aria-label="show cart item" color="inherit">
                              <Badge badgeContent={props.count} color="secondary">
                                <ShoppingCartIcon />
                              </Badge> 
                            </IconButton>
                          </div>
  
                      </Link>
                  </form> 

              </div>}

            </Typography>
            </div>
            
            
        </div>
      </Toolbar>
    </AppBar>  
    </header>
    </>
  )
}
