const express = require("express");
const router = express.Router();
const { addUser, getProdsByUser, getAllOrdersByUserID, getUserInfo, getLastOrderID } = require('./helperFunctions');

module.exports = (db) => {
  router.get('/:userID', (req,res) => {
    const id = req.params.userID;
    getUserInfo(id, db)
    .then((resp) => {
      res.send(resp);
    })
    .catch((e) => console.log(e));
  });

  //get products belonging to a particular user
  router.get("/products/:id", (req, res) => {
    const id = req.params.id;
    getProdsByUser(id, db)
      .then((resp) => {
        res.send(resp);
      })
      .catch((e) => console.log(e));
  });

  //get all orders belonging to a particular user
  router.get("/orders/:id", (req, res) => {

    const id = req.params.id;
    getAllOrdersByUserID(id, db)
      .then((id) => res.send(id))
      .catch((e) => {
        res.send(e);
      });
  });

    //get last order belonging to a particular user
    router.get("/:userID/lastOrder", (req, res) => {
      const id = req.params.userID;
      getLastOrderID(id, db)
        .then((id) => res.send(id))
        .catch((e) => {
          res.send(e);
        });
    });

  // Registration route (by clicking register button in header when not logged in)
  router.post("/", (req, res) => {
    const user = req.body;
    // user.password = user.password; // can add bcrypt here
    addUser(user, db)
      .then((user) => {
        req.session.user_id = user.id;
        req.session.email = user.email;
        res.send({ name: user.name, email: user.email, id: user.id });
      })
      .catch((err) => res.send(err));
  });

  return router;
};