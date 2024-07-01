const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// function for sign up
exports.signup = (req, res) => {
  // Save User to Database
  // mấy cái sau create có thể hiểu là nếu tạo trên web thì auto là user role
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    phone_number: req.body.phone_number,
    address_line1: req.body.address_line1,
    address_line2: req.body.address_line2,
    city: req.body.city,
    state_province: req.body.state_province,
    country: req.body.country,
    postcode: req.body.postcode,
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// function for signin
exports.signin = (req, res) => {
  // find email in database if no -> response error
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // decrypt password stored in database and compare password , if wrong -> response error
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      // if email , password correct, create jwt for authentication
      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          //username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

// upload all users information
exports.profile = async (req, res) => {
  // User.findOne({
  //   where: {
  //     email: req.body.email,
  //   },
  // })
  //   .then(
  //     res.status(200).send({
  //       first_name: user.first_name,
  //       last_name: user.last_name,
  //       email: user.email,
  //       phone_number: user.phone_number,
  //       address: user.address_line1,
  //       postcode: user.postcode,
  //     })
  //   )
  //   .catch((error) => {
  //     res.status(500).send({ message: err.message });
  //   });

  try {
    const users = await db.user.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};

// update user info
exports.updateInfo = async (req, res) => {
  try {
    // find in database if  request user_id = user_id in database -> update
    User.update(
      {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_number: req.body.phone_number,
        address_line1: req.body.address_line1,
        address_line2: req.body.address_line2,
        city: req.body.city,
        state_province: req.body.state_province,
        country: req.body.country,
        postcode: req.body.postcode,
      },
      {
        where: { id: req.body.user_id },
      }
    );
    res.status(200).json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating : " + error.message });
  }
};
