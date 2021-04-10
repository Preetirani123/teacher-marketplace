import { Grid   } from '@material-ui/core';
import React from 'react';
import Product from '../Product/Product'




const products = [
  {id: 1, name: 'product name', price: 200, owner_id: 'alex', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 2, name: 'product name', price: 200, owner_id: 'alex', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 3, name: 'product name', price: 200, owner_id: 'alex', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 4, name: 'product name', price: 200, owner_id: 'alex', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 5, name: 'product name', price: 200, owner_id: 'alex', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'},
  {id: 6, name: 'product name', price: 200, owner_id: 'alex', image: 'https://cdn.elearningindustry.com/wp-content/uploads/2016/05/top-10-books-every-college-student-read-1024x640.jpeg'}
];


export default function ProductContainer() {

  return (
    <div>
     <Grid container justify="center" spacing={4}>
       {products.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
         <Product product = {product}/>
       </Grid>
       ))}
       
     </Grid>
      
    </div>
  )
}
