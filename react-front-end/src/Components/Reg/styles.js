import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
      [theme.breakpoints.down('sm')]:{
        width: '40ch',
       
      }
    
    },
  },
  spread: {
    margin: '10px',
    
  },
  registration:{
    [theme.breakpoints.down('sm')]:{
      marginTop: '87px',
    },

  },
  input:{

  }
}));

export default useStyles;