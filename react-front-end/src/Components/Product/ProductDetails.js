import React from 'react'
import { IconButton, Button } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons'
import { useHistory } from "react-router-dom";

export default function ProductDetails(props) {
  return (
    <div>
      <img
        src={props.product.thumbnail_url}
        alt={props.product.name}
        width="500"
        height="600"
      />
      <h4>{props.product.name}</h4>
      <h5>{props.product.owner_id}</h5>
      <hr />
      <p>Price: {props.product.price}</p>
      <p>{props.product.description}</p>
      <Button aria-label="Add to Cart" onClick={props.add}>
        Add to Cart
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
