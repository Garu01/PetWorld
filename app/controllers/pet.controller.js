const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Pet = db.pet;
const Op = db.Sequelize.Op;

exports.upload_pet = (req, res) => {
  Pet.create({
    user_id: req.body.user_id,
    pet_type: req.body.pet_type,
    pet_breed: req.body.pet_breed,
    pet_title: req.body.pet_title,
    pet_color: req.body.pet_color,
    location: req.body.location,
    price: req.body.price,
    advertisement_type: req.body.advertisement_type,
    contact_preference: req.body.contact_preference,
    date_of_birth: req.body.date_of_birth,
    weight: req.body.weight,
    sex: req.body.sex,
    image: req.body.image,
    microchiped: req.body.microchiped,
    vaccinated: req.body.vaccinated,
    wormed_flead: req.body.wormed_flead,
    health_checked: req.body.health_checked,
    seller_name: req.body.seller_name,
  })
    .then(() => {
      res.status(200).send({ message: "Pet uploaded successfully" });
    })
    .catch((error) => {
      res
        .status(500)
        .send({ message: `Failed to upload pet: ${error.message}` });
    });
};

exports.showUserPet = async (req, res) => {
  try {
    // const pets = await db.pet
    //   .findAll({
    //     where: {
    //       user_id: req.body.user_id,
    //     },
    //   })
    //   //.then(res.json(pets));
    //   .then(res.render("hone", { pets }));
    const pets = await db.pet.findAll();
    const dataObject = pets.map((record) => record.toJSON());
    res.render("home", { pets: dataObject });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};
