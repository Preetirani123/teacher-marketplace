import React, { useState, useEffect } from "react";
import Nav from '../Nav/Nav';
import axios from 'axios';
import Order from '../Order/Order'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import './OrderContainer.scss';
import { useHistory, Link } from "react-router-dom";
import useStyles from '../Cart/styles';

export default function OrderContainer(props) {
  const classes = useStyles();

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
    <div className="orderContain">
      <Nav setResults = {props.setResults} count = {props.count} setEm = {props.setEm} setId = {props.setId} />
      <div className = {classes.srchBar}>
        {props.results.map((res, i) => 
                  <article key = {i}>
                    <Link to = {`/${res.id}`} key = {i}>
                      {res.name}
                    </Link>
                  </article>
        )}
        </div>
      <div className="orderContainInner">
      <h4>Below are your previous orders:</h4>
      <List component="nav" >
      {renderOrders}
      </List>
      </div>
    </div>
  );
}
