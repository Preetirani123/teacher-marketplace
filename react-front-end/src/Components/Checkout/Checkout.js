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

  const history = useHistory();
  const classes = useStyles();

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
    postOrder().then((resp) => {
      // post to order details
      for (const item of props.items) {
        postOrderDetails(resp.data.id, item.id, item.price, item.qty).then(
          () => {
          }
        );
      }
    });

    //send email to buyer and seller
    // Going to wait to implement this.
    // sendEmail()

    //redirect to Receipt
    history.push("/receipt");
  }

  // function for email

  function sendEmail() {

    const emailVariables = {
      name: props.u_email
    };

    emailjs
      .send(
        "REACT_APP_SERVICE_ID",
        "REACT_APP_TEMPLATE_ID",
        emailVariables,
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
    <div className="checkoutOutter">
      <>
      <Nav val= {props.val} setVal={props.setVal} setResults = {props.setResults} count = {props.count} setEm = {props.setEm} setId = {props.setId} />
      {( props.results === undefined || props.results.length === 0)
      ?
      ''
      :
      <div className = {classes.srchBar}>
             {props.results.map((res, i) => {
               return (<article key = {i}>
               <Link to = {`/${res.id}`} key = {i}>
                 {res.name}
               </Link>
             </article>)
             })}
      </div>
      }
      </>
      <div className="checkoutinner">
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Price</TableCell>
            </TableRow>
          </TableHead>
          {props.items.length === 0 ? (
            <p>Cart is empty - Go to the main page and buy some things</p>
          ) : (
            <TableBody key={Math.random()}>
              {props.items.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
                  <TableCell align="right">${row.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align='right'><b>Total : </b> ${props.total}</TableCell>
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
    </div>
  );
}
