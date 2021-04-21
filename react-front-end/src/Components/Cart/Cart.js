import React, { useState, useEffect } from "react";
import {
  CardMedia,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import useStyles from "./styles";
import { useHistory, Link } from "react-router-dom";
import Login from "../Login/Login";
import Nav from "../Nav/Nav";
import axios from "axios";

export default function Cart(props) {
  const [close, setClose] = useState('yes')
  const history = useHistory();
  const classes = useStyles();

  function changeQ(sign, id) {
    props.changeQty(sign, id);
  }

  


  return (


    <div className={classes.cartMain}>
      
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
    

      <div className={classes.cartwidth}>
        <div className={classes.butts}>
          <Button
            onClick={() => {
              history.push("/");
            }}
            variant="contained"
            color="primary"
            className={classes.spread}
          >
            Back
          </Button>


          {props.items.length === 0 ? (
            <Button
              variant="contained"
              color="primary"
              disabled
              className={classes.spread}
            >
              Checkout
            </Button>
          ) : (
            <Link to="/checkout" className={classes.colorLink}>
              <Button
                variant="contained"
                color="primary"
                className={classes.spread}
              >
                Checkout
              </Button>
            </Link>
          )}
        </div>

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
                <TableCell color="primary">Image</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
              </TableRow>
            </TableHead>
            {props.items.length === 0 ? (
              <p>Cart is empty</p>
            ) : (
              <TableBody key={Math.random()}>
                {props.items.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      <CardMedia
                        className={classes.CardMedia}
                        component="img"
                        image={row.thumbnail_url}
                        title={row.name}
                      />
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">
                      <Button
                        className={classes.cartQty}
                        onClick={() => changeQ("+", row.id)}
                      >
                        +
                      </Button>
                      <span className={classes.cartQtyNo}>{row.qty}</span>
                      <Button
                        className={classes.cartQty}
                        onClick={() => changeQ("-", row.id)}
                      >
                        -
                      </Button>
                    </TableCell>
                    <TableCell align="right">${row.price}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <b>Total</b> : ${props.total}
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
