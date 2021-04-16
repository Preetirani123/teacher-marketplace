const express = require("express");
const router = express.Router();
const { addOrder, addOrderDetails, getOrders, getOrder, getAllOrderDetails } = require('./helperFunctions');

module.exports = (db) => {
  // Get the orders Table
  router.get("/", (req, res) => {
    getOrders(db)
      .then((orders) => res.send(orders))
      .catch((e) => {
        res.send(e);
      });
  });

  // get a specific order
  router.get("/:orderID", (req, res) => {
    const orderID = req.params.orderID;
    getOrder(orderID, db)
      .then((orders) => res.send(orders))
      .catch((e) => {
        res.send(e);
      });
  });

  router.get("/details", (req, res) => {
    getAllOrderDetails(db)
     .then((details) => res.send(details))
     .catch((e) => res.send(e));
  });


  // insert an order
  router.post("/", (req, res) => {
    const { amount, cart } = req.body;
    const id = req.session.user_id;
    console.log("id from req.session.user_id", id);
    // console.log(cart);
    let serverResponse = null
    addOrder(amount, id, db)
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => res.send(e));
  });

  // // insert order details
  router.post("/details", (req, res) => {
    const { orderID, productID, price, quantity } = req.body;
    addOrderDetails(orderID, productID, price, quantity, db)
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => res.send(e));
  });

  return router;
};
