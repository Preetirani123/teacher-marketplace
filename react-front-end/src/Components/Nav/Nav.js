import React, { useState, useEffect } from 'react';
import { CssBaseline, AppBar, Toolbar, Typography, InputBase, Button, Icon, IconButton, Badge} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon  from '@material-ui/icons/Search';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from './styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios'
import './Nav.scss';

export default function Nav(props) {
  const history = useHistory();
  const [em, setEma] = useState('');

  const [val, setVal] = useState('')
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  useEffect(() => {


    axios.get('/login')
      .then((resp) => {
      console.log(resp.data)
      setEma(resp.data.email)
      props.setId(resp.data.id)
      props.setEm(resp.data.email)
  
    })
    .catch((e) => {console.log(e)});



    

  }, [])

  function search (e) {
    setVal(e.target.value)
    axios.get(`/search/${val}`)
    .then((resp) => {
      console.log(resp)
      console.log("&&&&&&&&&&&&&&&&&&&&&&")
      props.setResults([...resp.data])
    })
    .catch((e) => {console.log(e)})
  }
  
  function logout(e) {
    e.preventDefault();
    
    return axios.post('/logout').then((res) => {
      console.log(res)
      setEma('')
      props.setEm('')
      props.setId('')
      history.push('/')

    }).catch((e) => {
      console.log(e)
    })
    
    
  }

  const classes = useStyles();
  return (
    <>
    <header className={classes.header}>
    <CssBaseline />
    <AppBar position= "relative">
      <Toolbar >
        <div className={classes.navLogo}>
        <Link to = "/" className={classes.logo}>
        <Typography variant= "h6" className={classes.navLogotext}>
         <LocalLibraryIcon /> Smarter Teacher  
        </Typography>
        </Link>
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
              value = {val}
              onChange = {search}
            />
            {/* {results.map((res, i) => 
                <article key = {i}>
                  <Link to = {`/${res._id}`} key = {i}>
                     hshshshshash {typeof res._source === undefined ? '' : '77'}
                  </Link>
                </article>
            )} */}
            
            
          </div>
         </div>
         <div className={classes.navRight}>
            <div className={classes.navRight_1}>
            <Typography variant= "h6">

              {em === '' ? 
              <div className = {classes.logOut1}>
                {/* <Link to = "/Chat" className={classes.logOut2}>Chat</Link> */}
                
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

                  <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.logOut2} endIcon={<ExpandMoreIcon/>}>
                    {em}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Link to = "/orders" ><MenuItem onClick={handleClose}>My Orders</MenuItem></Link>
                    <Link to = "/products" ><MenuItem onClick={handleClose}>Product Dashboard</MenuItem></Link>
                    <Link to = "/Chat"><MenuItem onClick={handleClose}>Chat</MenuItem></Link>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </Menu>
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
