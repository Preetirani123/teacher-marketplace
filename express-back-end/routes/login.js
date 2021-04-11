const express = require("express");
const router = express.Router();

module.exports = (db) => {
  
  // To be replaced by a POST, and to be accessed via axios requests whenever needed, thereby preventing cookie management issues
  // // Login as specified user (by given id) and redirect to main page
  // router.get("/:id", (req, res) => {
  //   req.session.user_id = req.params.id;
  //   res.redirect("/");
  // });

  // Login user using information provided in form
  router.post('/', (req, res) => {
    const {email, password} = req.body;
    login(email, password, db)
      .then(user => {
        if (!user) {
          res.status(401);
          return res.send('test');
        }
        req.session.user_id = user.id;
        res.send({name: user.name, email: user.email, id: user.id});
      })
      .catch(e => res.send(e));
  });
  
  return router;
};
