
import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';
import Nav from '../Nav/Nav';
import useStyles from './styles';
import axios from "axios";

import ReactPaginate from 'react-paginate';
import './paginateStyle.scss';

import TopContent from '../TopContent/TopContent'




export default function ProductContainer(props) {
  const [state, setState] = useState({
    prod: [],
    offset: 0
  });

  useEffect(() => {
    Promise.all([axios.get("/product")]).then((all) => {
      // console.log(all[0].data);
      setState((prev) => ({
        ...prev,
        prod: all[0].data,
      }));
    });
  }, []);

  const classes = useStyles();

  const productsPerPage = 30;
  const { prod, offset } = state;

  const totalPages = Math.ceil( prod.length / productsPerPage);

  const handleClick = (data) => {
    let selected = data.selected;
    let newOffset = Math.ceil(selected * productsPerPage);
    console.log(selected);
    setState((prevState) => ({
      ...prevState,
      offset: newOffset
    }));
  };

  const currentProds = prod.slice(offset, offset+productsPerPage);

  const renderProds = currentProds.map((prod, index) => {
    return (
      <Grid item key={prod.id} xs={12} sm={6} md={4} lg={3}>
        <Product product={prod} setCart={props.setCart} />
      </Grid>
    );
  });

  return (
    <div>
      <Nav count = {props.count} setEm = {props.setEm} />
      <div className={classes.containWidth}>
      <TopContent />
        <Grid container justify="center" spacing={4} className={classes.spread}>
          {renderProds}
        </Grid>
        <div class="paginate">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={totalPages}
            marginPagesDisplayed={5}
            pageRangeDisplayed={30}
            onPageChange={handleClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
}
