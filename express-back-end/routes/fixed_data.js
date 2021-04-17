const express = require("express");
const router = express.Router();
const { getCats, getLevs, getProv, getSubj } = require('./helperFunctions');

module.exports = (db) => {
  

  // get categories
  router.get('/cats', (req, res) => {
    getCats(db)
      .then((resp) => {
        if (!resp) {
          resp.status(401);
          return res.send('error');
        }
        res.send(resp)
      })
      .catch(e => res.send(e));
  });

  // get levels
  router.get('/levels', (req, res) => {
    getLevs(db)
      .then((resp) => {
        if (!resp) {
          resp.status(401);
          return res.send('error');
        }
        res.send(resp)
      })
      .catch(e => res.send(e));
  });

  // get provinces
  router.get('/provs', (req, res) => {
    getProv(db)
      .then((resp) => {
        if (!resp) {
          resp.status(401);
          return res.send('error');
        }
        res.send(resp)
      })
      .catch(e => res.send(e));
  });

  // get subjects
  router.get('/subs', (req, res) => {
    getSubj(db)
      .then((resp) => {
        if (!resp) {
          resp.status(401);
          return res.send('error');
        }
        res.send(resp)
      })
      .catch(e => res.send(e));
  });

  
  
  return router;
};
