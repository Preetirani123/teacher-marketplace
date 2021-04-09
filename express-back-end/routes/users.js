const express = require("express");
const router = express.Router();
const { addUser } = require('./helperFunctions');


module.exports = (db) => {
  router.get("/", (req, res) => {
    const userID = req.session.user_id;
    if (userID) {
      db.query(`SELECT * FROM users WHERE id = $1;`, [userID])
        .then((data) => {
          const users = data.rows[0];
          res.send({ id: users.id, name: users.name, email: users.email });
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else {
      res.send({});
    }
  });

  // Registration route (by clicking register button in header when not logged in)
  router.post("/", (req, res) => {
    const user = req.body;
    // user.password = user.password; // can add bcrypt here
    addUser(user, db)
      .then((user) => {
        req.session.user_id = user.id;
        res.send(user);
      })
      .catch((err) => res.send(err));
  });


  



  return router;
};