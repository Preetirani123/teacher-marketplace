import React from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, InputBase, Button, IconButton, Badge} from '@material-ui/core';
import   SearchIcon  from '@material-ui/icons/Search';
import useStyles from './styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import {Link} from 'react-router-dom';
import axios from 'axios'

export default function Nav(props) {

const {cartItems} = props;
  function logout(e) {
    e.preventDefault();
    props.setEm("");
    return axios.post('/logout').then((res) => {
      console.log(res)
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
          <div>
            <Link to = "/login" className={classes.navLink}>Login</Link>
            <Link to = "/register" className={classes.navLink}>SignUp</Link>
            <Link to = "/cart" className={classes.navLink}>
            Cart{' '}
            {props.countCartItems ? (
              <button >{props.countCartItems}</button>
            ) : (
              ''
            )}

            </Link>
          </div>  
           : 
           <div>         
              <form className={classes.logOut1} noValidate autoComplete="off" onSubmit={logout}>
                  <Link to = "/login" className={classes.logOut2}>{props.u_email}</Link>
                  <Button type = "submit" variant="contained" color="primary" className = {classes.spread}>
                    Logout
                  </Button>
              </form> 

          </div>}

        </Typography>
        </div>
        <div className={classes.grow} />
          <div className={classes.buttion}>
            <IconButton aria-label="show cart item" color="inherit">
              <Badge badgeContent={""} color="secondary">
                <ShoppingCartIcon />
              </Badge> 
            </IconButton>
          </div>
        </div>
      </Toolbar>
    </AppBar>  
    </header>
    </>
  )
}
