import React from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, InputBase, Link, IconButton, Badge} from '@material-ui/core';
import   SearchIcon  from '@material-ui/icons/Search';
import useStyles from './styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';

export default function Nav() {
  const classes = useStyles();
  return (
    <>
    <header>
    <CssBaseline />
    <AppBar position= "relative">
      <Toolbar>
        <div className={classes.navLogo}>
        <Typography variant= "h6" className={classes.navLogotext}>
           <LocalLibraryIcon color="yellow"/> Smarter Teacher  
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
        <Link href="#" color="inherit" className={classes.navLink}>Login</Link>
        <Link href="#" color="inherit">SignUp</Link>
        </Typography>
        </div>
        <div className={classes.grow} />
          <div className={classes.buttion}>
            <IconButton aria-label="show cart item" color="inherit">
              <Badge badgeContent={2} color="secondary">
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
