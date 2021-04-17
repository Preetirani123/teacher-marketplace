const express = require("express");
const router = express.Router();
const { addOrderDetails, getAllOrderDetails } = require('./helperFunctions');

module.exports = (db) => {

  router.get("/", (req, res) => {
    getAllOrderDetails(db)
     .then((details) => res.send(details))
     .catch((e) => res.send(e));
  });
  
  // insert order details
  router.post("/", (req, res) => {
    const { orderID, productID, price, quantity } = req.body;
    addOrderDetails(orderID, productID, price, quantity, db)
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => res.send(e));
  });

  return router;
};