
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
  }
}));

export default useStyles;