
import { Grid } from '@material-ui/core';
import React from 'react'
import Product from '../Product/Product'
import Aside from '../Aside/Aside'
import useStyles from './styles';

const products = [
  {id: 1, name: 'english lesson', price: 200, owner_id: '2', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 2, name: 'maths worksheet', price: 2100, owner_id: '3', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 3, name: 'midterm 4', price: 1200, owner_id: '1', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 4, name: 'thesis 2', price: 4200, owner_id: '4', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 5, name: 'chemistry test', price: 2300, owner_id: '3', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 6, name: 'history test', price: 55200, owner_id: '4', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'}
];


export default function ProductContainer() {
  const classes = useStyles();
  return (
    <div>
     <Aside />
     <Grid container justify="center" spacing={4} className = {classes.spread}>
       
       {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
         <Product product = {product}/>
       </Grid>
       ))}
       
     </Grid>
      
    </div>
  )
}
