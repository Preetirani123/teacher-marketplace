import { fade, makeStyles } from '@material-ui/core/styles';
import { FullscreenExitTwoTone } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  spread: {
    margin: 10
  },
  logo: {
    color: '#ffffff',
    textDecoration: 'none',
  },
  a:{
    color: 'gray',
  },
  logOut1: {
    color: 'red',
    display: 'flex',
    fontfamily: '"Roboto Slab", serif',
    textDecoration: 'none',
  },
  logOut2: {
    marginRight: '10px',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    fontFamily: '"Roboto Slab", serif',
    textDecoration: 'none',
    '&:hover': {
      boxshadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
      backgroundcolor: '#e0e0e0',
      color: 'red',
    }
  },
  navLogo: {
    width: '30%',
    [theme.breakpoints.down('sm')]:{
      width: '100%',
      textAlign: 'center'
      
    },
    
  },

  navSearch: {
    width: '30%',
    lineHeight: '35px',
    [theme.breakpoints.down('sm')]:{
      width: '100%',
      lineHeight: '34px',
      margin: '10px  0px'
    },
  },
  navRight: {
    width: '40%',
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]:{
      width: '100%',
      justifyContent: 'center',
    },
  },
  navRight_1:{
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
      width: 'initial'

    }
  },
  navLink: {
    marginRight: '10px',
    color: '#ffffff',
     
  },
  header:{
    position: 'fixed',
    top: '0px',
    width: '100%',
    zIndex: '1',
    display: 'flex'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
footer: {
  color: '#ffffff',
  backgroundColor: '#3f51b5',
  padding: '20px 0',
  width: '100%',
  position: 'fixed',
  bottom: '0px',
  fontSize: '0.8rem',
  display: 'flex',
  justifyContent: 'center'
  
},
navLogotext: {
  fontFamily: '"Dancing Script", cursive' ,
  fontSize: '2rem'
},




}));



export default useStyles;