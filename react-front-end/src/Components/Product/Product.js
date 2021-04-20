import React, {useState, useEffect} from "react";
import { CardActions, CardContent, CardMedia, Typography, Card, IconButton } from '@material-ui/core';
import axios from 'axios';
import useStyles from './styles';
import {AddShoppingCart} from '@material-ui/icons'
import {BrowserRouter as Router, Route, Link, Switch, useParams} from 'react-router-dom'
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Nav from '../Nav/Nav';

export default function Product(props) {
  function add() {
    props.setCart(props.product);
  }
  const classes = useStyles();

  const [owner, setOwner] = useState('');

  useEffect(() => {
    axios.get(`/users/${props.product.owner_id}`).then((res) => {
      setOwner(res.data.name)
    });
  }, [])


  return (
    <>
    {/* <Nav setResults = {props.setResults} count = {props.count} setEm = {props.setEm} setId = {props.setId} /> */}
    <div>
      <Card className={classes.root}>
        <CardMedia
          className={classes.CardMedia}
          component="img"
          image={props.product.thumbnail_url}
          title={props.product.name}
        />
        <CardContent>
          <div>
            <Typography
              variant="h5"
              gutterBottom
              align="center"
              style={{ fontFamily: "Rajdhani" }}
            >
              {props.product.name}
            </Typography>
          </div>
          <div className={classes.cart}>
            <Typography
              variant="h6"
              gutterBottom
              align="center"
              className={classes.price}
            >
              Price ${props.product.price}
            </Typography>
            <CardActions className={classes.CardActions}>
              <IconButton aria-label="Add to Cart" onClick={add}>
                <AddShoppingCart />
              </IconButton>
            </CardActions>
          </div>
          <Typography
            variant="h5"
            gutterBottom
            align="center"
            className={classes.owner}
          >
            Material posted By {owner}
          </Typography>
          <Link to={`/${props.product.id}`}>
            <Typography align="center" style={{fontSize: '15px', cursor: 'pointer', textDecoration: 'none'}}><AddCircleOutlineRoundedIcon />More Details</Typography>
          </Link>
        </CardContent>
      </Card>
    </div>
    </>
  );
}
