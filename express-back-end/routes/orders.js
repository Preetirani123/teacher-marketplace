const express = require("express");
const router = express.Router();
const { addOrder, addOrderDetails } = require('./helperFunctions');

module.exports = (db) => {
  
  //insert into order details table
  //insert into orders table
  //read 
 

  // insert an order 
  router.post('/', (req, res) => {
    const { amount, id } = req.body;
    //const id = req.session.user_id
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
