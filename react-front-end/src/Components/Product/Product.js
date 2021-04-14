import { CardActions, CardContent, CardMedia, Typography, Card, IconButton } from '@material-ui/core';
import React from "react";
import useStyles from './styles';
import {AddShoppingCart} from '@material-ui/icons'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

export default function Product(props) {
  function add() {
    console.log("ssssssssssssssss");
    console.log(props.product);
    props.setCart(props.product);
  }

  const classes = useStyles();

  return (
    <Router>
      <div>
        <Link path="/product/:productID">
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
                Material posted By {props.product.owner_id}
              </Typography>
            </CardContent>
          </Card>
        </Link>
      </div>
    </Router>
  );
}
