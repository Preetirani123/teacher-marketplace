import React from 'react'
import ProductContainer from '../ProductContainer/ProductContainer'
import TopContent from '../TopContent/TopContent'
import Aside from '../Aside/Aside'
import Nav from '../Nav/Nav';
import Login from '../Login/Login';
import Reg from '../Reg/Reg';
import useStyles from './styles';
import Footer from '../Footer/Footer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


export default function Main() {
  const classes = useStyles();
  return (
    <div>
      <Router>
      <main >
        <Nav />

        <Switch>

            <Route path = "/login" component = {Login} />
            <Route path = "/register" component = {Reg} />
            

        </Switch>
        
        
        <Footer />
      </main>
      </Router>
    </div>
  )
}
