
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Product from '../Product/Product'
import Aside from '../Aside/Aside'
import useStyles from './styles';
import axios from "axios";

export default function ProductContainer(props) {
 
  const [state, setState] = useState({
    prod:[],
    page: 1,
    prodsPerPage: 30
  })

  useEffect(() => {
    Promise.all([axios.get("/product")]).then((all) => {
      console.log(all[0].data);
      console.log("xpxpxpxpxpxpxpx");

      setState((prev) => ({
        ...prev,
        prod: all[0].data,
      }));
    });
  }, []);

  const handleClick = (pageNum) => {
    setState((prevState) => ({
      ...prevState,
      page: Number(pageNum),
    }));
  };

  const { prod, page, prodsPerPage } = state;

  // Logic for displaying prod
  const indexOfLastProd = page * prodsPerPage;
    const indexOfFirstProd = indexOfLastProd - prodsPerPage;
    console.log(prod);
    const currentProds = prod.slice(indexOfFirstProd, indexOfLastProd);

    const renderProds = currentProds.map((prod, index) => {
      return (
        <Grid item key={prod.id} xs={12} sm={6} md={4} lg={3}>
          <Product product={prod} setCart={props.setCart} />
        </Grid>
      );
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(prod.length / prodsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={(event) => handleClick(event.target.id)}
        >
          {number}
        </li>
      );
    });

  const classes = useStyles();
  
  return (
    <div>
     <Aside />
     <Grid container justify="center" spacing={4} className = {classes.spread}>
        {renderProds}
       {/* {state.prod.map((product) => (
        <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
         <Product product = {product} setCart = {props.setCart} />
       </Grid>
       ))} */}
     </Grid>
      {renderPageNumbers}
    </div>
  )
}
