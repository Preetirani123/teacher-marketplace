import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  },
  aside: {
    width: '25%',
    padding: '10px'
    
  },
  product: {
    width: '72%',
    padding: '10px'
  }
}));

export default useStyles;