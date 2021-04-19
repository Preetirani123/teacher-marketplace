import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';
import Nav from '../Nav/Nav';
import useStyles from './styles';
import axios from "axios";
import { useHistory, Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import './paginateStyle.scss';

import TopContent from '../TopContent/TopContent'

export default function ProductContainer(props) {
  const [state, setState] = useState({
    prod: [],
    offset: 0
  });

  const history = useHistory();
  useEffect(() => {
    Promise.all([axios.get("/product")]).then((all) => {
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

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };

  const handleClick = (data) => {
    let selected = data.selected;
    let newOffset = Math.ceil(selected * productsPerPage);
    console.log(selected);
    setState((prevState) => ({
      ...prevState,
      offset: newOffset
    }));
    scrollToTop();
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
      <Nav setResults = {props.setResults} count = {props.count} setEm = {props.setEm} setId = {props.setId} />
      

      <div className={classes.containWidth}>
      <TopContent results = {props.results} />
        <Grid container justify="center" spacing={4} className={classes.spread}>
          {renderProds}
        </Grid>
        <div className="paginate">
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
