import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: '100%',
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
    borderRadius: '50%',
    height: '200px'
  },
  cartMain: {
    width: '100%',
  },
  cartwidth: {
    width: '60%',
    margin: '30px auto',
    
  }
}));


export default useStyles;