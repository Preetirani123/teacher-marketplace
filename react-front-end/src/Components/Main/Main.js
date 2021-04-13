import React, { useState, useEffect } from "react";
import ProductContainer from '../ProductContainer/ProductContainer'
import Login from '../Login/Login';
import Reg from '../Reg/Reg';
import useStyles from './styles';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import Checkout from '../Checkout/Checkout';
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


export default function Main(props) {

  const classes = useStyles();
  const [state, setState] = useState({
    email : '',
    cart : [],
    countItems : 0
  })

  useEffect(() => {
    axios.get("/cart").then((all) => {
      
      console.log(all.data)
      let cit = 0;
      if (all.data !== []) {
        for (let e of all.data) {
          cit += e.qty
        }
      }
      
      setState((prev) =>
      { 
        return {
          ...prev,
          cart: all.data,
          countItems: cit
        }
      });


    });
  }, []);

  const setEm = (email) => {
    setState((prev) =>
    { 
      return {
        ...prev,
        email: email
      }
    });
  };
  const setCart = (newer) => {
    let items = [...state.cart]
    let cnt = state.countItems
    cnt += 1;
    setState((prev) =>
      { 
        return {
          ...prev,
          countItems: cnt
        }
    });
    newer.qty = 1
    const found = state.cart.find(e => e.id === newer.id);
    if (found !== undefined) {
      let pos = state.cart.indexOf(found)
      
      let item  = {...items[pos]}
      let each_item_price = Number(item.price) / item.qty
      let total = Number(item.price)
      item.qty += 1;
      total += each_item_price
      item.price = Math.round((total + Number.EPSILON) * 100) / 100
      items[pos] = item
      upd_cart(items)
      setState((prev) =>
      { 
        return {
          ...prev,
          cart: items
        }
      });

    } else {
        setState((prev) =>
        { 
          return {
            ...prev,
            cart: [...prev.cart, newer]
          }
        });
        items.push(newer)
        upd_cart(items)
    }

    
    
  }

  const changeQty = (v, id) => {
    console.log(v, id)
    let item = state.cart.find(e => e.id === id)
    let each_item_price = Number(item.price) / item.qty
    let total = Number(item.price)
    let pos = state.cart.indexOf(item)
    let items = [...state.cart]
    if (v === '-') {
      let cnt = state.countItems
      cnt -= 1;
      if (item.qty === 1) {
        items.splice(pos, 1)
      } else {
        item.qty -= 1
        total -= each_item_price
        item.price = Math.round((total + Number.EPSILON) * 100) / 100
        items[pos] = item
      }
      upd_cart(items)

      setState((prev) =>
      { 
        return {
          ...prev,
          cart: items,
          countItems: cnt
        }
      });
    }
    if (v === '+') {
      let cnt = state.countItems
      cnt += 1;
      item.qty += 1
      total += each_item_price
      item.price = Math.round((total + Number.EPSILON) * 100) / 100
      items[pos] = item
      upd_cart(items)
      setState((prev) =>
      { 
        return {
          ...prev,
          cart: items,
          countItems: cnt
        }
      });
    }   
  }
  

  
  function upd_cart (c) {
    console.log(c)
    console.log("555555555555555")
    axios.post('/cart',
    {
      data: c
    }).then((resp)=> {
      console.log(resp.data)
    })
    .catch((e) => {
      
    });
  }
  

  
  return (
    <div>
      <Router>

        <main >
          
          <div className={classes.Route}>
            <Switch >
              <Route path = "/checkout" >
                {state.email === '' ?
                <Login  setEm = {setEm} count = {state.countItems} /> 
                :
                <Checkout items = {state.cart} count = {state.countItems} u_email = {state.email} />
                }
              </Route>
              <Route path="/cart" >
                <Cart items = {state.cart} changeQty = {changeQty} count = {state.countItems} setEm = {setEm}  />
              </Route>
              <Route path="/login_err" >
                <Login  msg = {'You need to sign in first before proceeding to payment'} />  
              </Route>
              <Route path="/login" >
                {state.email === '' ?
                <Login  setEm = {setEm} count = {state.countItems} />  
                :
                <ProductContainer setCart = {setCart} count = {state.countItems} setEm = {setEm} />
                }
              </Route>
              <Route path = "/register" >
                {state.email === '' ?
                <Reg  setEm = {setEm} count = {state.countItems} />  
                :
                <ProductContainer setCart = {setCart} count = {state.countItems} setEm = {setEm} />
                }
              </Route>
              
              <Route path="/" >
                <ProductContainer setCart = {setCart} count = {state.countItems} setEm = {setEm} />
              </Route>
            </Switch>
          </div>


          <Footer />
        </main>
      </Router>
    </div>
  )
}
