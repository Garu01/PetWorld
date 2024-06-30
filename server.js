const express = require("express");
const cors = require("cors");
const app = express();
const { Pool } = require("pg");
const { engine } = require("express-handlebars");
const path = require("path");
const bodyParser = require("body-parser");
const Handlebars = require("handlebars");
require("dotenv").config();
//const cookieParser = require("cookie-parser");
require("dotenv").config();

// const { upload, uploadMultiple } = require("./app/middleware/mutler.js");

// const {
//   getStorage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL,
// } = require("firebase/storage");
// const {
//   signInWithEmailAndPassword,
//   createUserWithEmailAndPassword,
//   getAuth,
// } = require("firebase/auth");
// const { auth } = require("./app/config/fbs.config.js");

// const {
//   allowInsecurePrototypeAccess,
// } = require("@handlebars/allow-prototype-access");

// setup for cors
var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "\\app\\public")));
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
//app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Role = db.role;
// db.sequelize.sync();
// force: true will drop the table if it already exists
// initial : use first time with force : true
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and Resync Database with { force: true }");
  //initial();
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/pet.routes")(app);
require("./app/routes/transaction.routes")(app);
// require("./app/routes/transaction.routes")(app);
// const user = auth.currentUser;
// async function uploadImage(file, quantity) {
//   const storageFB = getStorage();

//   await signInWithEmailAndPassword(auth, "garuwriters@gmail.com", "123456");

//   if (quantity === "single") {
//     const dateTime = Date.now();
//     const fileName = `images/${dateTime}`;
//     const storageRef = ref(storageFB, fileName);
//     const metadata = {
//       contentType: file.type,
//     };
//     await uploadBytesResumable(storageRef, file.buffer, metadata);

//     const downloadURL = await getDownloadURL(storageRef);
//     console.log(downloadURL);
//     return downloadURL;
//   }

//   if (quantity === "multiple") {
//     for (let i = 0; i < file.images.length; i++) {
//       const dateTime = Date.now();
//       const fileName = `images/${dateTime}`;
//       const storageRef = ref(storageFB, fileName);
//       const metadata = {
//         contentType: file.images[i].mimetype,
//       };

//       const saveImage = await Image.create({ imageUrl: fileName });
//       file.item.imageId.push({ _id: saveImage._id });
//       await file.item.save();

//       await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
//     }
//     console.log(imageUrl);
//     return;
//   }
// }

// app.post("/api/test-upload", upload, async (req, res) => {
//   const file = {
//     type: req.file.mimetype,
//     buffer: req.file.buffer,
//   };
//   try {
//     const buildImage = await uploadImage(file, "single");
//     res.send({
//       status: "SUCCESS",
//       imageName: buildImage,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// Template engine
// app.engine(
//   ".hbs",
//   engine({
//     extname: ".hbs",
//     //handlebars: allowInsecurePrototypeAccess(Handlebars),
//   })
// );
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "\\app\\resources\\views"));

// console.log(path.join(__dirname, "\\app\\resources\\views"));
// set port, listen for requests
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
