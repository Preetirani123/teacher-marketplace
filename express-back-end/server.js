require("dotenv").config();

const express = require("express");
const app = express();
const PORT = 8081;
const ENV = process.env.ENV || "development";
const cookieSession = require("cookie-session");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

// Definitions for PG
const { Pool } = require("pg");
const dbParams = require("./lib/db.js"); // check this..
const db = new Pool(dbParams);
db.connect();

'use strict'

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


const usersRoutes = require("./routes/users");
const productRoutes = require("./routes/product");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");
const cartRoutes = require("./routes/cart");

const fixedDataRoutes = require("./routes/fixed_data");
// const orderRoutes = require("./routes/orders");

const orderRoutes = require("./routes/orders");
const orderDetailsRoutes = require("./routes/orderDetails");
const searchRoutes = require("./routes/search");



app.use("/users", usersRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/product", productRoutes(db, client));
app.use("/logout", logoutRoutes(db));
app.use("/cart", cartRoutes());

app.use("/fixed", fixedDataRoutes(db));
// app.use("/orders", orderRoutes(db));

app.use("/orders", orderRoutes(db));
app.use("/orderdetails", orderDetailsRoutes(db));
app.use("/search", searchRoutes(db, client));



// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
