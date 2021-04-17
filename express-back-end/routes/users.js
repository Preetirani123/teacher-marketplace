const express = require("express");
const router = express.Router();
const { addUser, getProdsByUser } = require('./helperFunctions');


module.exports = (db) => {
 
  //get products belonging to a particular user
  router.get('/products/:id', (req, res) => {
    const id = req.params.id
    getProdsByUser(id, db)
    .then((resp) => {
      console.log(resp)
      res.send(resp);
    })
    .catch((e) => console.log(e))
  });





  // Registration route (by clicking register button in header when not logged in)
  router.post("/", (req, res) => {
    const user = req.body;
    // user.password = user.password; // can add bcrypt here
    addUser(user, db)
      .then((user) => {
        req.session.user_id = user.id;
        req.session.email = user.email
        res.send({name: user.name, email: user.email, id: user.id});
      })
      .catch((err) => res.send(err));
  });




  



  return router;
};