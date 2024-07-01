const { verifySignUp } = require("../middleware");
const pet = require("../controllers/pet.controller");
const controller = require("../controllers/auth.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  // app.get("/api/auth/userinfo", controller.profile);

  app.get("/users", controller.profile);

  app.post("/api/updateUserInfo", controller.updateInfo);
};
