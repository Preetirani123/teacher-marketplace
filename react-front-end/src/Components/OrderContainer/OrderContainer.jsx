import React, { useState, useEffect } from "react";
import Nav from '../Nav/Nav';
import axios from 'axios';
import Order from '../Order/Order'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

export default function OrderContainer(props) {

  const [orders, setOrders] = useState({
    ords: []
  });

  useEffect(() => {
    axios.get(`users/orders/${props.u_id}`).then((res) => {
      setOrders((prevState) => ({
        ...prevState,
        ords: res.data,
      }));
    })
  },[]);

  const renderOrders = orders.ords.slice(0).reverse().map((order) => {
    return (
      <>
      <Order className={order.id} orderID = {order.id} amount = {order.amount} purchased={order.purchased}/>
      <Divider />
      </>
    )
  });

  return (
    <div>
      <Nav count={props.count} setEm={props.setEm} setId={props.setId} />
      <h4>Below are your previous orders:</h4>
      <List component="nav">
      {renderOrders}
      </List>
    </div>
  );
}
