import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  cart: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
   justifyContent: 'space-between',
    alignItems: 'center'
  },
  owner: {
    borderTop: '1px solid #e2e0e0',
    paddingTop: '10px'
  }
  
}));

export default useStyles;