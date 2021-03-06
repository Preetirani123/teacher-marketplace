import React, {useState} from 'react';
import { useHistory, Link } from "react-router-dom";
import {TextField, Button, Typography} from '@material-ui/core';
import useStyles from './styles';
import axios from 'axios'
import Nav from '../Nav/Nav';
import '../Login/Login.scss';

export default function Reg(props) {
  const classes = useStyles();
  

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function register (e) {
    e.preventDefault();
    return axios.post('/users', 
     {
       name : name,
       email: email,
       password: password
     })
    .then((res)=> {
      
      
      history.push("/")

    })
    .catch(() => {
      //Failed registration or username already taken.
    });
 };

  return (
    <div>

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

        
        <div className = {classes.registration}>

        <Button onClick = {() => {history.push('/')}} variant="contained" color="primary" className = {classes.spread}>
          Back
        </Button>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={register}>
         <Typography variant = "h4" className={classes.spread}>
           Registration
         </Typography>
          <div>
            <TextField required id="standard-required" label="Email" name = "email" 
            className={classes.spread} 
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            />
          </div>
          <div>
            <TextField id="standard-required" label="Name" className={classes.spread} name = "name" 
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div>
            <TextField required id="standard-password-input" label="Password" className={classes.spread} name = "password"
            type="password" autoComplete="current-password" 
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            />
          </div>
          <div>
            <Button type = "submit" variant="contained" color="primary" className = {classes.spread}  >
              Submit
            </Button>
          </div>
        </form> 
        </div>
    </div>
  )
}  
        
