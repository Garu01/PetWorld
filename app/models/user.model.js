module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    first_name: {
      type: Sequelize.STRING,
    },
    last_name: {
      type: Sequelize.STRING,
    },
    phone_number: {
      type: Sequelize.STRING,
    },
    address_line1: {
      type: Sequelize.STRING,
    },
    address_line2: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    state_province: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    postcode: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
