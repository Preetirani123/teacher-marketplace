
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  spread: {
    margin: 0,
    [theme.breakpoints.down('sm')]:{
      width: '100%',
    }
    
  },
  containWidth: {
    width: '80%',
    margin: 'auto',
    [theme.breakpoints.down('sm')]:{
      width: '100%',
    }
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
  }
}));

export default useStyles;