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
    marginBottom: '15px',
    
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
    width: '150px',
    borderRadius: '50%',
    height: '150px',
    [theme.breakpoints.down('sm')]:{
      width: '70px',
      height: '70px',
    }
  },
  cartMain: {
    width: '100%',
    [theme.breakpoints.down('sm')]:{
      marginTop: '80px',
      
    },
  },
  cartwidth: {
    width: '60%',
    margin: '30px auto',
    [theme.breakpoints.down('sm')]:{
      width: '100%',
      
    }
    
  },
  cartQty: {
    width: 'initial'
  },
  cartQtyNo: {
    margin: 'auto 10px',
    [theme.breakpoints.down('sm')]:{
      margin: 'auto 25px',
    },
  },
  srchBar: {
    position: 'fixed',
    background: '#B7ACAC',
    width: '29%',
    margin: 'auto',
    left: '31%',
    right: '40%',
    top: '52',
    padding: '5',
    borderRadius: '5',
    zIndex: 10000
  },
  closeIcon: {
    left: '59%',
    right: '40%',
    width: '1%',
    position: 'fixed',
    margin: 'auto'
  }

  
}));


export default useStyles;