const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");
const { engine } = require("express-handlebars");
const path = require("path");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(express.static(path.join(__dirname, "\\app\\public")));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  //initial();
});

// simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to bezkoder application." });
// });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// app.get("/api/auth/userinfo", async (req, res) => {
//   const find_email = "123@gmail.com";
//   // user = db.user;
//   // const result = await user.findAll({
//   //   where: {
//   //     email: find_email,
//   //   },
//   // });
//   res.send(find_email);
// });

// app.get("/users", async (req, res) => {
//   const email = req.query.email;
//   console.log(req.query.email);
//   try {
//     if (email) {
//       const user = await User.findOne({ where: { email } });
//       if (user) {
//         res.json(user);
//       } else {
//         res.status(404).send("User not found");
//       }
//     } else {
//       res.status(400).send("Email query parameter is required");
//     }
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     res.status(500).send("Error fetching user");
//   }
// });

// app.get("/users", async (req, res) => {
//   try {
//     const users = await db.user.findAll();
//     res.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     res.status(500).send("Error fetching users");
//   }
// });

// app.engine("handlebars", engine());
// app.set("view engine", "handlebars");
// app.set("views", path.join(__dirname, "./app/resources/views"));

// Template engine
app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    //handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "\\app\\resources\\views"));

// app.get("/", (req, res) => {
//   res.render("home");
// });
console.log(path.join(__dirname, "\\app\\resources\\views"));
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  //db.user.console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "moderator",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }
