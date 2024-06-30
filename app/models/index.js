const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,

  {
    host: config.HOST,
    dialect: config.dialect,
    port: config.PORT,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.pet = require("../models/pet.model.js")(sequelize, Sequelize);
db.transaction = require("../models/transactions.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

db.user.hasMany(db.pet, {
  foreignKey: "user_id",
});

db.pet.belongsTo(db.user, {
  foreignKey: "user_id",
});
db.user.hasMany(db.transaction, {
  foreignKey: "user_id",
});
db.pet.hasMany(db.transaction, {
  foreignKey: "pet_id",
});
db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
