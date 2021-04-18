import React from 'react';
import axios from 'axios';

export default function Orders() {

  function getAllOrders() {
    axios.get('/orders')

  };

  return (
    <div>



    </div>
  )
}
