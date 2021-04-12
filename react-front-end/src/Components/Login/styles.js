import { makeStyles } from '@material-ui/core/styles';
import { Label } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '50ch',
    },
  },
  spread: {
    margin: 10
  },
  
}));

export default useStyles;