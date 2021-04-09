require("dotenv").config();

const Express = require("express");
const App = Express();
const BodyParser = require("body-parser");
const PORT = 8080;
const ENV = process.env.ENV || "development";
const cookieSession = require("cookie-session");

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static("public"));

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

// Sample GET route
// App.get("/api/data", (req, res) =>
//   res.json({
//     message: "Seems to work!",
//   })
// );

// Routes
// / = home page
// login POST AND GET
// Logout POST
// register GET AND POST
// products GET AND POST

const usersRoutes = require("./routes/users");
const productRoutes = require("./routes/product");
const loginRoutes = require("./routes/login");
const logoutRoutes = require("./routes/logout");

app.use("/users", usersRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/product", productRoutes(db));
app.use("/logout", logoutRoutes());

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(
    `Express seems to be listening on port ${PORT} so that's pretty good 👍`
  );
});
