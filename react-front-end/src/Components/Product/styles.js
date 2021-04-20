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
    paddingTop: '10px',
    fontFamily: '"Dancing Script", cursive' ,
  },
  price: {
    fontFamily: 'Rajdhani',
  },
  CardMedia:{
    height: '250px'
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