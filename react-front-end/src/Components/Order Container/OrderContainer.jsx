import React, { useState } from "react";
import Nav from '../Nav/Nav';


import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';


export default function OrderContainer(props) {

  [orders, SetOrders] = useState({
    ords: [],
    ordDetails: [],
  });

  useEffect(() => {
    axios.get(`users/orders/${props.u_id}`).then((res) => {
      setOrders((prevState) => ({
        ...prevState,
        ords: res[0].data,
      }));
    })
  });

  const renderOrders = orders.ords.map((order) => {
    return (
      <Order orderID = {order.id} amount = {order.amount} purchased={order.purchased}/>
    )
  });

  return (
    <div>
      <Nav count={props.count} setEm={props.setEm} setId={props.setId} />
      {renderOrders}
    </div>
  );
}
