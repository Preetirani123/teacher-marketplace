import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
   
    backgroundColor: theme.palette.background.paper,
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
  }

}));


export default useStyles;