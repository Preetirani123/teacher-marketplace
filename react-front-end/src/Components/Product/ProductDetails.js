import React, {useState,useEffect} from 'react'
import { IconButton, Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import { useHistory } from "react-router-dom";
import useStyles from './styles';
import Nav from '../Nav/Nav';
import axios from 'axios'
import {
  useParams
} from "react-router-dom";

export default function ProductDetails(props) {
  const [productState, setProduct] = useState([{}]);

  function add() {
    props.setCart(productState);
  }

  const history = useHistory();
  const classes = useStyles();
  const {productID} = useParams();

  useEffect(() => {
    axios.get(`/product/${productID}`).then((res) => {
      setProduct(res.data[0]);
    });
  },[]);

  return (
    <div>
      <div>
        <Nav count={props.count} setEm={props.setEm} />
      </div>
      <img
        src={productState.thumbnail_url}
        alt={productState.name}
        width="500"
        height="600"
      />
      <h5>owner: {productState.owner_id}</h5>
      <hr />
      <p>Price: {productState.price}</p>
      <p>{productState.description}</p>
      <Button aria-label="Add to Cart" onClick={add}>
        Add to Cart <AddShoppingCart />
      </Button>
      <Button
        onClick={() => {
          history.push("/");
        }}
        variant="contained"
        color="primary"
        className={classes.spread}
      >
        Back
      </Button>
    </div>
  );
}
