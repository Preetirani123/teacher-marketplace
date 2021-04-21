import React, {useState} from 'react';
import { useHistory, Redirect, Link } from "react-router-dom";
import {TextField, Button, Typography} from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios'
import Nav from '../Nav/Nav';

import './Login.scss';
export default function Login(props) {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function login(e) {
    e.preventDefault();
    
    return axios.post('/login',
    {
      email: email,
      password: password
    }).then((res)=> {
      
      history.push('/')
      
    })
    .catch((e) => {
      
    });
    
  }
  function loginRoutes () {
    
    history.push('/')
  
  }



  return (
    <div >
        
        <Nav setResults = {props.setResults} count = {props.count} setEm = {props.setEm} setId = {props.setId} />
        
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
       
          <div className="LoginInner"> 
        <Button onClick = {loginRoutes} variant="contained" color="primary" className = {classes.spread}>
          Back
        </Button>
        <Typography variant = "h4" className={classes.spread}>{props.msg !== undefined ? props.msg : ''}</Typography>
        <form className={classes.root} noValidate autoComplete="off" onSubmit = {login}>
         <Typography variant = "h4" className={classes.spread}>
           Login
         </Typography>
         
          <div>
            <TextField required id="standard-required"  label="Email" className={classes.spread} 
            value={email}
            onChange={(event) => {setEmail(event.target.value);
            }} />
          </div>
          <div>
            <TextField required id="standard-password-input" label="Password" className={classes.spread} 
            type="password" autoComplete="current-password" 
            value={password}
            onChange={(event) => {setPassword(event.target.value);
            }} />
          </div>
          <div>
            <Button type = "submit" variant="contained" color="primary" className = {classes.spread}>
              Submit
            </Button>
          </div>
        </form> 
        </div>
    </div>
    
  )
}  
        
