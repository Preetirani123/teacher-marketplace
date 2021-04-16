const express = require("express");
const router = express.Router();
const { getProducts, insertProduct, updateProduct, deleteProduct, getProduct } = require('./helperFunctions');

module.exports = () => {

    router.get("/", (req, res) => {
      if (req.session.cart) {
        res.send(req.session.cart);
        return;
      }
      res.send([])
      
    });

    router.post("/", (req, res) => {
      req.session.cart = req.body.data
      res.send(req.session.cart)  
    });

    

    return router;
};    

