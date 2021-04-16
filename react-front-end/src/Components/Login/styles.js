import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
      [theme.breakpoints.down('sm')]:{
        width: '30ch',
       
      }
    },
  },
  spread: {
    margin: 10,
    
  },
  loginclass: {
    [theme.breakpoints.down('sm')]:{
      marginTop: '87px',
    },
    
  }
  
}));

export default useStyles;