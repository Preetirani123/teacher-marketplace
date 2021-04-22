import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  srchBar: {
    position: 'fixed',
    background: 'yellow',
    color: 'blue',
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