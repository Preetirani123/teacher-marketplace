
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Product from '../Product/Product'
import Aside from '../Aside/Aside'
import useStyles from './styles';
import axios from "axios";



export default function ProductContainer(props) {
 
  const [state, setState] = useState({
    prod:[]
  })

  useEffect(() => {
    Promise.all([
      axios.get('/product'),
    ]).then((all) => {
      console.log(all[0].data);
      console.log("xpxpxpxpxpxpxpx")

      setState(prev => (
        {
          ...prev,
          prod: all[0].data
        }
      ))
    })
  }, []);

  const classes = useStyles();
  
  return (
    <div>
     <Aside />
     <Grid container justify="center" spacing={4} className = {classes.spread}>
       
       {state.prod.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
         <Product product = {product} setCart = {props.setCart} />
       </Grid>
       ))}
       
     </Grid>
      
    </div>
  )
}
