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
    height: '200px'
  },
  
  cartwidth:{
    
  }
}));


export default useStyles;