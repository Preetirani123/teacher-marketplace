import React, { useState } from "react";
import ProductContainer from '../ProductContainer/ProductContainer'
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import Reg from '../Reg/Reg';
import useStyles from './styles';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import Checkout from '../Checkout/Checkout';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


export default function Main(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    email : '',
    cart : [],
    countItems : 0
  })

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
      let items = [...state.cart]
      let item  = {...items[pos]}
      let each_item_price = Number(item.price) / item.qty
      let total = Number(item.price)
      item.qty += 1;
      total += each_item_price
      item.price = Math.round((total + Number.EPSILON) * 100) / 100
      items[pos] = item
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
  
  return (
    <div>
      <Router>

        <main >
          <Nav u_email = {state.email} setEm = {setEm} count = {state.countItems} />
          <div className={classes.Route}>
          <Switch >
            <Route path = "/checkout" >
              <Checkout items = {state.cart} />
            </Route>
            <Route path="/cart" >
              <Cart items = {state.cart} changeQty = {changeQty} u_email = {state.email} />
            </Route>
            <Route path="/login_err" >
              <Login setEm = {setEm} msg = {'You need to sign in first before proceeding to payment'} />  
            </Route>
            <Route path="/login" >
              <Login setEm = {setEm} />  
            </Route>
            <Route path = "/register" >
              <Reg setEm = {setEm} />
            </Route>
            
            <Route path="/" >
              <ProductContainer setCart = {setCart} />
            </Route>
          </Switch>
          </div>


          <Footer />
        </main>
      </Router>
    </div>
  )
}
