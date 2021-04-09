import { CardActions, CardContent, CardMedia, Typography, Card, IconButton } from '@material-ui/core'
import React from 'react'
import useStyles from './styles';
import {AddShoppingCart} from '@material-ui/icons'



export default function Product({product}) {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.root}>
        <CardMedia className={classes.CardMedia} component="img" image={product.image}  title={product.name} />
         <CardContent>
           <div>
             <Typography variant="h5" gutterBottom align="center">
               {product.name}
             </Typography>
           </div>
           <div className={classes.cart}>
           <Typography variant="h6" gutterBottom align="center">
             Price: {product.price}
             </Typography>
           <CardActions disableSpacing className={classes.CardActions}>
             <IconButton aria-label='Add to Cart'>
               <AddShoppingCart />
             </IconButton>
           </CardActions>
           </div>

           <Typography variant="h5" gutterBottom align="center" className={classes.owner} >
               {product.owner_id}
             </Typography>

         </CardContent>

      </Card>


      
      
    </div>
  )
}
