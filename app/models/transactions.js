module.exports = (sequelize, Sequelize) => {
  const Transaction = sequelize.define("transactions", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
    },
    pet_id: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    total_price: {
      type: Sequelize.FLOAT,
    },
  });
  return Transaction;
};
