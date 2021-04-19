import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  table: {
    minWidth: 650,
  },
  
  tableHead: {
    backgroundColor: '#ff00008a',
    color: '#ffffff'
  },
  
  cartContainer: {
    
    borderRadius: '10px',
    boxshadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
  },
  root: {
    '& > span': {
      margin: theme.spacing(2),
      
    },
  },
  spread: {
    margin: 10
  },
  colorLink: {
    color: 'white'
  },
  
  butts: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  CardMedia: {
    width: '200px',
    borderRadius: '2%',
    height: '200px',
    [theme.breakpoints.down('sm')]:{
    width: '80px',
    borderRadius: '50%',
    height: '80px',
    }
  },
  
  dashboard: {
    width: '100%'
  },
  dashboardinner: {
    width: '95%',
    margin: '70px auto',
    [theme.breakpoints.down('sm')]:{
      margin: '100px auto',
    }
  }
}));


export default useStyles;