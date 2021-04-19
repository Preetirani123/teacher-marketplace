import React, {useState, useEffect} from "react";
import Nav from "../Nav/Nav";
import axios from 'axios'
import useStyles from '../Checkout/styles';
import { useParams } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

export default function OrderDetails(props) {

  const { orderID } = useParams();

  const classes = useStyles();

  const [orders, setOrderDetails] = useState({
    orderDetails: [],
    products: [],
  });

  useEffect(() => {
    axios.get(`/orderdetails/order/${orderID}`)
    .then((res) => {
      setOrderDetails((prevState) => ({
        ...prevState,
        orderDetails: [...prevState.orderDetails,...res.data]
      }));
 
      res.data.map((order) => {
        axios.get(`/product/${order.prod_id}`).then((resp) => {
          console.log('resp data', resp.data);
          setOrderDetails((prevState) => ({
            ...prevState,
            products: [...prevState.products,...resp.data]
          }));
        });
      })
    })
  }, []);

  const PDFLinks = orders.products.map((item, index) => {
    return (
      <>
        <a href={`'${item.pdf_link}'`} download>
          PDF Link #{index}
        </a>
        <p>{"\n"}</p>
      </>
    );
  });

  const total = orders.products.reduce((total, prod) => {
    return total + Number(prod.price);
  }, 0)


  function getQuantity (productID) {
    for (let detail of orders.orderDetails)
    {
      if (detail.prod_id === productID)
      {
        return(
          <TableCell align="center">{detail.quantity}</TableCell>
        );
      }
    }
  }


  return (
    <div>
      <Nav count={props.count} setEm={props.setEm} setId={props.setId} />
      <h4>Order Number: {orderID}</h4>
      <Table
          key={1}
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead color="primary">
            <TableRow className={classes.tableHead}>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
            <TableBody key={2}>
              {orders.products.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.name}</TableCell>
                  {getQuantity(row.id)}
                  <TableCell align="right">${row.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align='right'>Total ${total}</TableCell>
              </TableRow>
            </TableBody>
        </Table>
        <div className='PDF Links'>
          <h3>Download your files here:</h3>
            {PDFLinks}
        </div>

    </div>
  );
}
