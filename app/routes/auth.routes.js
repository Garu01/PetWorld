const { verifySignUp } = require("../middleware");

// xen function controller o folder trong require
const controller = require("../controllers/auth.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    // use header
    next();
  });

  // receive signup request
  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  // receive signin request ->
  app.post("/api/auth/signin", controller.signin);

  // app.get("/api/auth/userinfo", controller.profile);

  // upload user information
  app.get("/users", controller.profile);

  // receive updated data from server -> update in database
  app.post("/api/updateUserInfo", controller.updateInfo);
};
