import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Nav from '../Nav/Nav'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import useStyles from '../Checkout/styles';
import axios from 'axios';
import './Receipt.scss';


export default function Receipt(props) {
  const history = useHistory();
  const classes = useStyles();

  if (history[-1] !== "/checkout") {
    history.push("/");
  }

  const [tempCart, setTempCart] = useState([]);
  const [order, setOrder]= useState();

  useEffect(() => {
    axios.get(`/users/${props.u_id}/lastOrder`).then((resp) => {
      setOrder(resp.data.id);
    });

    transferCart();
    if (tempCart.length !== 0) {
      ////clear Cart
      props.setCart((prevState) => ({
        ...prevState,
        cart: [],
        total: 0,
        countItems: 0,
      }));
      axios.delete('/cart')
    }
    
    // return () => {
    //   setTempCart([]);
    // };
  },[tempCart]);  

  function transferCart(){
    setTempCart(props.items);
  }

  const PDFLinks = tempCart.map((item, index) => {
    return (
      <>
        <a href={`'${item.pdf_link}'`} download>
          PDF Link #{index}
        </a>
        <p>{"\n"}</p>
      </>
    );
  });

  const total = tempCart.reduce((total, prod) => {
    return total + Number(prod.price);
  }, 0)


  return (
    <div className="receiptoutter">
      <Nav />
      <div className="receiptinner">
      <h1>Thank you for your Order.</h1>
      <h2>Your Order Number is: {order} </h2>
      <h2>You will be recieving a confirmation email shortly </h2>
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
          {tempCart.length === 0 ? (
            <p>Cart is empty - Go to the main page and buy some things</p>
          ) : (
            <TableBody key={2}>
              {tempCart.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
                  <TableCell align="right">${row.price}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align='right'>Total ${total}</TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
        <div className='PDF Links'>
          <h3>Download your files here:</h3>
            {PDFLinks}
        </div>
      </div>
    </div>
  );
}
