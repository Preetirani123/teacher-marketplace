const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    res.clearCookie('session');
    res.clearCookie('session.sig');
    res.redirect('/');
  });
  return router;
};