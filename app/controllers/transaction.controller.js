const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;
const Pet = db.pet;
const Transaction = db.transaction;

// create transaction when receive from client
exports.createTransaction = async (req, res) => {
  Transaction.create({
    user_id: req.body.user_id,
    pet_id: req.body.pet_id,
    quantity: req.body.quantity,
    total_price: req.body.total_price,
  })
    .then(() => {
      res.status(200).send({ message: "Order successfully" });
    })
    .catch((err) => {
      res.status(500).send("Error Order");
    });
};
