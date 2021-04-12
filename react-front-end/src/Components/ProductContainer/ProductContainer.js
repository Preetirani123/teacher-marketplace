
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Product from '../Product/Product'
import Aside from '../Aside/Aside'
import useStyles from './styles';
import axios from "axios";
import Pagination from 'react-bootstrap/Pagination'

export default function ProductContainer(props) {
  const [state, setState] = useState({
    prod: [],
    page: 1,
    prodsPerPage: 30,
  });

  useEffect(() => {
    Promise.all([axios.get("/product")]).then((all) => {
      console.log(all[0].data);

      setState((prev) => ({
        ...prev,
        prod: all[0].data,
      }));
    });
  }, []);

  const { prod, page, prodsPerPage } = state;

  // Logic for displaying prod
  const indexOfLastProd = page * prodsPerPage;
  const indexOfFirstProd = indexOfLastProd - prodsPerPage;
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

  const renderPageNumbers = pageNumbers.map((number) => {

    
    return (
      <Pagination.Item key={number} id={number} active={number === page} onClick={(event => handleClick(event.target.id))}>
        {number}
      </Pagination.Item>
    );
  });

  const handleClick = (pageNum) => {
    if (pageNum > pageNumbers.length || pageNum < 1){
      return;
    }
    setState((prevState) => ({
      ...prevState,
      page: Number(pageNum),
    }));
  };

  const classes = useStyles();

  return (
    <div>
      <Aside />
      <Grid container justify="center" spacing={4} className={classes.spread}>
        {renderProds}
      </Grid>
      <Pagination>
        <Pagination.Prev 
          onClick={(event => handleClick(page - 1))}
          />
        {renderPageNumbers}
        <Pagination.Next 
          onClick={(event => handleClick(page + 1))}
        />
      </Pagination>
    </div>
  );
}
