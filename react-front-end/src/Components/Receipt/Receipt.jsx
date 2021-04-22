import React, {useState, useEffect} from 'react'
import { useHistory, Link } from "react-router-dom";
import Nav from '../Nav/Nav'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import useStyles from '../Checkout/styles';
import axios from 'axios';
import './Receipt.scss';


export default function Receipt(props) {
  const classes = useStyles();

  const [order, setOrder]= useState();
  const [total, setTotal] = useState();
  const [orderDetails, setOrderDetails] = useState(
    {
      product: [],
      price: [],
      quantity: []
    }
  );
  const [products, setProducts]= useState(
    {
      name: [],
      pdf: []
    }
  );

  useEffect(() => {
    console.log(props.u_id);
    axios.get(`/users/${props.u_id}/lastOrder`)
    .then((resp) => {
      console.log(resp.data.id);
      setOrder(resp.data.id);
      return resp.data.id
    })
    .then((order) => {
      axios.get(`/orders/${order}`)
      .then((res)=> {
        setTotal((prevState) => {
          return res.data[0].amount
        });
      })
      return order;
    })
    .then((order) => {
      console.log('order', order);
      let details = axios.get(`/orderdetails/order/${order}`)
      .then((res) => {
        res.data.forEach(detail => {
          setOrderDetails((prevState) => {
            return {
              product: [...prevState.product, detail.prod_id],
              price: [...prevState.price, detail.price],
              quantity: [...prevState.quantity, detail.quantity]
            }
          }) 
        })  
        return res.data;
      })
      return details;
      //here
    })
    .then((details) => {
      details.forEach((item) => {
        axios.get(`/product/${item.prod_id}`)
        .then((res) => {
          console.log('res in product', res.data)
          res.data.forEach(product => {
            setProducts((prevState) => {
              return {
                name: [...prevState.name, product.name],
                pdf: [...prevState.pdf, product.pdf_link]
              }
            })
          })
        })
      })
    })
    .then(() => {
      axios.delete('/cart') //working
    })

    // // transferCart();
    // if (tempCart.length !== 0) {
    //   ////clear Cart
    //   // props.setCart((prevState) => 
    //   //   {
    //   //     return {
    //   //   ...prevState,
    //   //   cart: [],
    //   //   total: 0,
    //   //   countItems: 0,
    //   //   }
    //   // });

    //   props.setState((prevState) => 
    //     {
    //       return {
    //     ...prevState,
    //     cart: [],
    //     total: 0,
    //     countItems: 0,
    //     }
    //   });

  },[]);  

  // setState((prev) =>
  // { 
  //   return {
  //     ...prev,
  //     cart: items,
  //     countItems: cnt
  //   }
  // });



  // function transferCart(){

  //   a
  //   //setTempCart(props.state.items);
  // }

  // const PDFLinks = products.pdf.map((item, index) => {
  //   return (
  //     <>
  //       <a href={`${item}`} target="_blank" download>
  //         PDF Link #{index}
  //       </a>
  //       <p>{"\n"}</p>
  //     </>
  //   );
  // });

  // const total = tempCart.reduce((total, prod) => {
  //   return total + Number(prod.price);
  // }, 0)

const receiptTable = (i) => {
  return(
    <TableRow key={products.name[i]}>
    <TableCell align="left">{products.name[i]}</TableCell>
    <TableCell align="center">{orderDetails.quantity[i]}</TableCell>
    <TableCell align="right">${orderDetails.price[i]}</TableCell>
    </TableRow>)
  }

  console.log('products', products);

  return (
    <div className="receiptoutter">
      <Nav val= {props.val} setVal={props.setVal} setResults = {props.setResults} count = {props.count} setEm = {props.setEm} setId = {props.setId} />
      {( props.results === undefined || props.results.length === 0) 
      ?
      ''
      :
      <div className = {classes.srchBar}>
             {props.results.map((res, i) => {
               return (<article style = {{'fontSize': '25px'}} key = {i}>
               <Link to = {`/${res.id}`} key = {i}>
                 {res.name}
               </Link>
             </article>)
             })}
      </div>
      }
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
          {orderDetails.product.length === 0 ? (
            <p>Cart is empty - Go to the main page and buy some things</p>
          ) : (
            <TableBody key={2}>
              {orderDetails.product.map((item, index) => {
                return receiptTable(index);
              })}

              {/* {orderDetails.product.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
                  <TableCell align="right">${row.price}</TableCell>
                </TableRow>
              ))} */}
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
          {products.pdf.map((item, index) => {
            return (
              <>
                <a href={`${item}`} target="_blank" download>
                  PDF Link #{index}
                </a>
                <p>{"\n"}</p>
              </>
            )}
          )}
        </div>
      </div>
    </div>
  );
}
