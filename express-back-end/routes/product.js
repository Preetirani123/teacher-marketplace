const express = require("express");
const router = express.Router();
const { getProducts, insertProduct } = require('./helperFunctions');


module.exports = (db) => {
  
  //get all products
  router.get("/", (req, res) => {
    getProducts(db)
      .then(products => res.send(products))
      .catch(e => {
        res.send(e);
      });
  });

  //creates a new product
  router.post("/", (req,res) => {
    const userID = req.session.user_id;
    const description = req.body.text_description;
    const categoryID = req.body.categoryID // may need to perform calculations to see what category its in
    const price = req.body.price;
    const thumbnail_url = req.body.thumbnail_url;
    const subject_id = req.body.subject_id;// may need to perform calculations to see what category its in
    const grade = req.body.grade; // may need to perform calculations to see what category its in
    const province = req.body.province; // may need to perform calculations to see what category its in
    insertProduct(
          userID,
          categoryID,
          description,
          price,
          thumbnail_url,
          subject_id,
          grade,
          province,
          db
        )
      .then((task) => {
        res.send(task);
      })
      .catch((e) => {
        console.error(e);
        res.send(e);
      });
  });





  return router;
};