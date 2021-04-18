import React from 'react';
import axios from 'axios';

export default function Orders(props) {

  function getAllOrders() {
    axios.get('users/orders/:id')

    props.u_id
  };

  return (
    <div>



    </div>
  )
}
