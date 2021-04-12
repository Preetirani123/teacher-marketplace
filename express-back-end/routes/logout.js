const express = require("express");
const router = express.Router();

module.exports = (db) => {
  
  //endpoint for allowing users to log out of their accounts
  router.post('/', (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};