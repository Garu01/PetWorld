module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "giadinhlaso1",
  DB: "PetWorld",
  PORT: 6666,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
