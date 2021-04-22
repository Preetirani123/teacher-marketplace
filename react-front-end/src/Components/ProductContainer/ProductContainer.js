import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Product from '../Product/Product';
import Nav from '../Nav/Nav';
import Aside from '../Aside/Aside';
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
  const [ordP, setOrdP] = useState('')
  const [ocat, setOcat] = useState('')
  const [olev, setOlev] = useState('')
  const [oprov, setOprov] = useState('')
  const [osub, setOsub] = useState('')
  const [which, setWhich] = useState('')



  const history = useHistory();
  useEffect(() => {
    Promise.all([axios.get("/product")]).then((all) => {
      console.log(all)
      console.log("%%%%%%%%%%%%%%%%%%%%%%%")
      let stuff = all[0].data;
      // if (Number(ordP) === 1) {
      //   stuff = stuff.filter((s) => Number(s.price) < 50)
      // }
      setState((prev) => ({
        ...prev,
        prod: stuff.reverse()
      }));
    });



    

  }, []);

  const classes = useStyles();

  const productsPerPage = 30;
  const { prod, offset } = state;

  

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
  


  let w = prod
  
  //price filter
  if (Number(ordP) === 1) {
    w = w.filter((s) => Number(s.price) < 50)
  } else if (Number(ordP) === 2) {
    w = w.filter((s) => Number(s.price) < 100 && Number(s.price) >= 50)
  } else if (Number(ordP) === 3) {
    w = w.filter((s) => Number(s.price) < 150 && Number(s.price) >= 100)
  } else if (Number(ordP) === 4) {
    w = w.filter((s) => Number(s.price) >= 150 )
  }

  
  //cat filter

  if (ocat !== '' || typeof ocat === 'number') {
    w = w.filter((s) => Number(s.cat_id) === Number(ocat))
  }  

  //level filter

  if (olev !== '' || typeof olev === 'number') {
    w = w.filter((s) => Number(s.level_id) === Number(olev))
  } 

  //subject filter

  if (osub !== '' || typeof osub === 'number') {
    w = w.filter((s) => Number(s.subject_id) === Number(osub))
  } 

  //province filter

  if (oprov !== '' || typeof oprov === 'number') {
    w = w.filter((s) => Number(s.province_id) === Number(oprov))
  } 

  //order by name or price

  if (Number(which) === 1) {
    w.sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (Number(which) === 2) {
    w.sort(function(a, b) {
      let nameA = a.name.toUpperCase(); 
      let nameB = b.name.toUpperCase(); 
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }


  const totalPages = Math.ceil( w.length / productsPerPage);

      const currentProds = w.slice(offset, offset+productsPerPage);
      const renderProds = currentProds.map((prod, index) => {
        return (
          <Grid item key={prod.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={prod} setCart={props.setCart} />
          </Grid>
        );
      });
      
    

  return (
    <div>
      <Nav val= {props.val} setVal={props.setVal} setResults = {props.setResults} count = {props.count} setEm = {props.setEm} setId = {props.setId} />
      {(props.results.length === 0 || props.results === undefined) 
      ?
      ''
      :
      <div className = {classes.srchBar}>
             {props.results.map((res, i) => {
               return (<article style = {{'fontSize': '25px'}} key = {i}>
               <Link to = {`/${res.id}`} key = {i}>
                 {res.name}
               </Link>
             </article>)
             })}
      </div>
      }

      
      

      <div className={classes.containWidth}>
      <TopContent results = {props.results} />

        <Aside ordP = {ordP} setOrdP = {setOrdP} ocat = {ocat} setOcat = {setOcat} olev = {olev} setOlev = {setOlev}
        oprov = {oprov} setOprov = {setOprov} osub = {osub} setOsub = {setOsub} which = {which} setWhich = {setWhich}
        />

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
