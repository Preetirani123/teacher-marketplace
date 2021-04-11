const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // router.get('/', (req, res) => {
  //   res.clearCookie('session');
  //   res.clearCookie('session.sig');
  //   res.redirect('/');
  // });


  //endpoint for allowing users to log out of their accounts
  router.post('/', (req, res) => {
    req.session = null;
    res.redirect('/');
  });
  return router;
};