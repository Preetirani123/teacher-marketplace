import React from 'react';
import axios from 'axios';

export default function Orders(props) {

  function getOrderDetails(orderID) {
    axios.get(`/orderdetails/order/${orderID}`).then((res) => {
      setOrders((prevState) => ({
        ...prevState,
        ordDetails: res[0].data
      }));
    });
  }
  
  
  return (
    <div>




    </div>
  )
}
