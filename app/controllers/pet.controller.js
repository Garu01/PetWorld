const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Pet = db.pet;
const Op = db.Sequelize.Op;

exports.upload_pet = (req, res) => {
  const base64Image = req.body.image;
  const byteaData = Buffer.from(base64Image, "base64");
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
    image: byteaData,
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

    // const petsWithBase64Images = pets.map((pet) => ({
    //   const base64Image = pet.image ? pet.image.toString("base64") : null;
    //   return { ...pet.toJSON(), image: base64Image };
    // });
    //res.json(petsWithBase64Images);
    //res.status(404).send("Pet not found");

    const responseData = pets.map((record) => ({
      id: record.id,
      type: record.pet_type,
      title: record.pet_title,
      base64String: record.image ? record.image.toString("base64") : null,
      user_id: record.user_id,
      // Map other fields as necessary
    }));
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};
