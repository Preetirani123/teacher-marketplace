import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardMedia, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import useStyles from './styles';
import { useHistory, Link } from "react-router-dom";
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import Nav from '../Nav/Nav';

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import './CheckoutStyles.scss';

const promise = loadStripe("pk_test_51IamO7F2v7FmERryBHILYa3LMwxLz5T5K4xSOzE8zlXrhZEeKZJfznkXYWFSVEzWFDLq7tMwHJc4lDodRUGZBySF00H7oR9ZqR");

const {REACT_APP_SERVICE_ID, REACT_APP_TEMPLATE_ID, REACT_APP_USER_ID} = process.env

export default function Checkout(props) {

  const [orderNumber, setOrderNumber] = useState();

  const history = useHistory();
  const classes = useStyles();
  console.log(history);

  function postOrder() {
    return axios.post('/orders',
    {
      amount: props.total,
      cart: props.items
    })
  }

  function postOrderDetails(ordID, prodID, price, qty) {
    return axios.post('/orderdetails',
    {
      orderID: ordID,
      productID: prodID,
      price: price,
      quantity: qty
    });
  }

  function finalizeSale(e) {
    e.preventDefault();

    //post to server order 
    postOrder()
      .then((resp)=> {
        console.log(resp.data)
        setOrderNumber(resp.data.id)
    });

    // post to order details
    for (const item of props.items) {
      postOrderDetails(orderNumber, item.id, item.price, item.qty)
      .then(() => {
        console.log('posted to order details')
      });
    }

    //send email to buyer and seller
    // })
    // .catch((e) => {
    // });

      //Clear the cart
      //Maybe want to do this in receipts?
      // props.setCart((prevState) => ({
      //   ...prevState, 
      //   cart: [],
      //   total: 0,
      //   countItems: 0
      // }))

    //redirect to Receipt
    // history.push('/receipt')


    
  }

  // function for email
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "REACT_APP_SERVICE_ID",
        "REACT_APP_TEMPLATE_ID",
        e.target,
        "REACT_APP_USER_ID"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  // Note please make the checkout form and pdf file name is Pdf and user name is name
  //and call the sendEmail funtion in checkout form like this onSubmit={sendEmail}

  return (
    <div>
      <>
      <Nav count={props.count} setEm={props.setEm} />
      </>
      <TableContainer
        key={Math.random()}
        component={Paper}
        className={classes.cartContainer}
        style={{
          boxshadow:
            "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        }}
      >
        <Table
          key={Math.random()}
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead color="primary">
            <TableRow className={classes.tableHead}>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          {props.items.length === 0 ? (
            <p>Cart is empty - Go to the main page and buy some things</p>
          ) : (
            <TableBody key={Math.random()}>
              {props.items.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.qty}</TableCell>
                  <TableCell align="right">${row.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total ${props.total}</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <br/>
      <div className="stripe">
        <Elements stripe={promise}>
          <CheckoutForm />
        </Elements>
      </div>
      <br/>
      <div className="AutoPay">
        <form
          className={classes.root}
          noValidate
          autoComplete="off"
          onSubmit={finalizeSale}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.spread}
          >
            Demo Mode - AutoPay
          </Button>
        </form>
      </div>
    </div>
  );
}
