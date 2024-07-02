const db = require("../models");
const config = require("../config/auth.config");

const User = db.user;
const Role = db.role;
const Pet = db.pet;
const Transaction = db.transaction;

// create transaction when receive from client
exports.createTransaction = async (req, res) => {
  const { extractedData, totalPrice } = req.body;
  console.log(extractedData);
  try {
    for (const item of extractedData) {
      Transaction.create({
        user_id: item.user_id,
        pet_id: item.id,
        quantity: item.qty,
        total_price: totalPrice,
      });
      Pet.update({ available: "false" }, { where: { id: item.id } });
    }
    res.status(200).json({ message: "Order successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error order: " + error.message });
  }
  // try {
  //   Transaction.create({
  //     user_id: req.body.user_id,
  //     pet_id: req.body.pet_id,
  //     quantity: req.body.quantity,
  //     total_price: req.body.total_price,
  //   }).then(() => {
  //     res.status(200).send({ message: "Order successfully" });
  //   });
  // } catch (err) {
  //   res.status(500).send("Error Order");
  // }
};
