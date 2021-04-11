import React, { useState, useEffect } from "react";
import axios from "axios";



export default function Cart(props) {

  const { cartItems, onAdd, onRemove } = props;

  return (
    <div>
      {cartItems.length === 0 && <div> Cart is Empty </div>}
      {cartItems.map((item) => ( // item = {product: 1, qty: 5}
        <div key={item.id} className="row">
          <div >{item.name}</div>
          <div >
            <button onClick={() => onRemove(item)} >
              -
              </button>{' '}
            <button onClick={() => onAdd(item.product)} >
              +
              </button>
          </div>

          <div >
            {item.qty} x ${item.price}
          </div>
        </div>
      ))}

    </div>
  )
}
