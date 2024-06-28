const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Pet = sequelize.define("pets", {
    user_id: {
      type: Sequelize.STRING,
    },
    pet_type: {
      type: Sequelize.STRING,
    },
    pet_breed: {
      type: Sequelize.STRING,
    },
    pet_title: {
      type: Sequelize.STRING,
    },
    pet_color: {
      type: Sequelize.STRING,
    },
    location: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.FLOAT,
    },
    advertisement_type: {
      type: Sequelize.STRING,
    },
    contact_preference: {
      type: Sequelize.STRING,
    },
    date_of_birth: {
      type: Sequelize.DATEONLY,
    },
    weight: {
      type: Sequelize.FLOAT,
    },
    sex: {
      type: Sequelize.STRING,
    },
    image: {
      type: Sequelize.BLOB("long"),
    },
    microchiped: {
      type: Sequelize.STRING,
    },
    vaccinated: {
      type: Sequelize.STRING,
    },
    wormed_flead: {
      type: Sequelize.STRING,
    },
    health_checked: {
      type: Sequelize.STRING,
    },
    seller_name: {
      type: Sequelize.STRING,
    },
    // available: {
    //   type: Sequelize.BOOLEAN,
    // },
  });

  return Pet;
};
