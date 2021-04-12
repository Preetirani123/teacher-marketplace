import { makeStyles } from '@material-ui/core/styles';
import { FullscreenExitTwoTone } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
  },
  spread: {
    margin: 10
  },
  butts: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}));


export default useStyles;