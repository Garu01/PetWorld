const pet = require("../controllers/pet.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/showPet", pet.showUserPet);

  app.post("/api/pets", pet.uploadPet);

  app.post("/api/adminRemove", pet.removePet);

  app.post("/api/adminCheck", pet.adminCheck);

  app.get("/api/showUserPet", pet.uploadUserPetDetail);

  app.post("/api/updateUserPet", pet.updatePet);

  app.post("/api/userRemove", pet.removePet);
};
