import { fade, makeStyles } from '@material-ui/core/styles';
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

  navLogo: {
    width: '30%'
  },

  navSearch: {
    width: '30%'
  },
  navRight: {
    width: '40%',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  navRight_1:{
    width: '20%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  navLink: {
    marginRight: '10px',
    color: '#ffffff'
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
  position: 'relative',
  bottom: '0px',
  fontSize: '0.8rem',
  
},
navLogotext: {
  fontFamily: '"Dancing Script", cursive' ,
  fontSize: '2rem'
},
}));

export default useStyles;