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
      margin: '105px auto',
    },

  },
  input:{

  },
  srchBar: {
    position: 'absolute',
    background: '#B7ACAC',
    width: '50%',
    margin: 'auto',
    left: '31%',
    top: '52',
    padding: '5',
    borderRadius: '5',
    zIndex: 10000
  }
}));

export default useStyles;