const express = require("express");
const router = express.Router();
const { addOrder, addOrderDetails, getOrders, getOrder } = require('./helperFunctions');

module.exports = (db) => {
  
  // Get the orders Table
  router.get("/", (req, res) => {
    getOrders(db)
      .then(orders => res.send(orders))
      .catch(e => {
        res.send(e);
      });
  });

  // get a specific order
  router.get("/:orderID", (req, res) => {
    const orderID = req.params.orderID
    getOrder(orderID, db)
      .then(orders => res.send(orders))
      .catch(e => {
        res.send(e);
      });
  });

    //Get a specific product
    router.get("/:productID", (req, res) => {
      const productID = req.params.productID;
      getProduct(productID, db)
        .then(products => res.send(products))
        .catch(e => {
          res.send(e);
        });
  });


  // insert an order 
  router.post('/', (req, res) => {
    const { amount } = req.body;
    const id = req.session.user_id
    console.log('id from req.session.user_id', id)
    addOrder(amount, id, db)
      .then((resp) => {
        if (!resp) {
          resp.status(401);
          return res.send('error');
        }
        res.send(resp)
       // req.session.order_id = res.id;
      //  req.session.timestamp = res.purchased
        //res.send({ o_id: res.id, time: res.purchased, email: 'eee' });
      })
      .catch(e => res.send(e));
  });

  // insert order details
  router.post('/details', (req, res) => {
    const { o_id, p_id, qty } = req.body;
    //const id = req.session.user_id
    addOrderDetails(o_id, p_id, qty, db)
      .then((resp) => {
        if (!resp) {
          resp.status(401);
          return res.send('error');
        }
        res.send(resp)
       // req.session.order_id = res.id;
      //  req.session.timestamp = res.purchased
        //res.send({ o_id: res.id, time: res.purchased, email: 'eee' });
      })
      .catch(e => res.send(e));
  });

  
  
  return router;
};
