import React, { useState, useEffect } from "react";
import ProductContainer from '../ProductContainer/ProductContainer'
import TopContent from '../TopContent/TopContent'
import Aside from '../Aside/Aside'
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import Reg from '../Reg/Reg';
import useStyles from './styles';
import Footer from '../Footer/Footer';
import Cart from '../Cart/Cart';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


export default function Main(props) {

  const [cartItems, setCartItems] = useState([]);

  const onAdd = (product) => {
    console.log(product);

    const exist = cartItems.find((x) => x.product === product.id);
    const index = cartItems.map((x) => x.product).indexOf(product.id)
    console.log(exist)
    console.log(cartItems)

    if (exist) {
      let copyCart = [...cartItems];
      let item = { ...exist };
      item.qty += 1;
      copyCart[index] = { name: product.name, product: exist.product, qty: item.qty, price: product.price };
      setCartItems(copyCart);
    } else {
      setCartItems((prev) => {
        return [...prev, { name: product.name, product: product, qty: 1, price: product.price }];
      });

    }
  };
  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };


  const classes = useStyles();
  const [state, setState] = useState({
    email : ''
  })
  const setEm = email => setState({ ...state, email });
  // const [name, setName] = useState('');
  // const [password, setPassword] = useState('');
  return (
    <div>
      <Router>

        <main >
           <Nav u_email = {state.email} setEm = {setEm} countCartItems={cartItems.length} />
          
          <Switch>
            <Route path="/cart" >
              <Cart cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
            </Route>

            <Route path="/login" component={Login} />
            <Route path = "/register" >
              <Reg setEm = {setEm} />
            </Route>
            <Route path="/" >
              <ProductContainer onAdd={onAdd} />
            </Route>


          </Switch>


          <Footer />
        </main>
      </Router>
    </div>
  )
}
