const express = require("express");
const cors = require("cors");
const app = express();
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

var corsOptions = {
  origin: "http://localhost:8081",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;
//db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and Resync Db");
  initial();
});
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
