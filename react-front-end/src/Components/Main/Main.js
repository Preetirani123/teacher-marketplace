import React, {useState} from 'react'
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
        <Nav u_email = {state.email} setEm = {setEm} />


        <Switch>
            
            <Route path = "/login" component = {Login} />
            <Route path = "/register" >
              <Reg setEm = {setEm} />
            </Route>
            <Route path = "/" component = {ProductContainer} />
            
        </Switch>
        
        
        <Footer />
      </main>
      </Router>
    </div>
  )
}
