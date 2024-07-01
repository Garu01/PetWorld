const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Pet = db.pet;

// function for upload pet to database
exports.uploadPet = async (req, res) => {
  // image data received in client is base64 -> convert to base64 then stored in database
  const base64Image = req.body.image;
  const byteaData = Buffer.from(base64Image, "base64");
  await Pet.create({
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
    admin_check: req.body.admin_check,
    available: req.body.available,
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

// upload pet information. this function only show some column that use for show in UI
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

    // up load all pet data and first_name of user in user table
    const pets = await db.pet.findAll({
      include: {
        model: User,
        attributes: ["first_name"],
        required: false, // Allow pets without associated users
      },
    });

    const responseData = pets.map((record) => ({
      id: record.id,
      type: record.pet_type,
      title: record.pet_title,
      breed: record.pet_breed,
      base64String: record.image ? record.image.toString("base64") : null,
      user_id: record.user_id,
      price: record.price,
      color: record.pet_color,
      date_of_birth: record.date_of_birth,
      first_name: record.user.first_name,
      admin_checked: record.admin_check,
      available: record.available,
      // Map other fields as necessary
    }));
    res.json(responseData);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Error fetching users");
  }
};

// trong pets data có column admin_check dùng để check xem thông tin pet đó ok không, nếu ok thì sẽ được
// show lên trang web cho mọi người xem
exports.adminCheck = async (req, res) => {
  const { availableCheck } = req.body;

  try {
    for (const item of availableCheck) {
      await Pet.update({ admin_check: "true" }, { where: { id: item.id } });
    }
    res.status(200).json({ message: "Admin Check updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating admin Check : " + error.message });
  }
};

// function for removed pet
exports.removePet = async (req, res) => {
  const { removeCheck } = req.body;

  try {
    for (const item of removeCheck) {
      await Pet.destroy({ where: { id: item.id } });
    }
    res.status(200).json({ message: "Items removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating remove : " + error.message });
  }
};

// function for show all pet info. This function show all pet column for user edit their pet info
exports.uploadUserPetDetail = async (req, res) => {
  try {
    const pets = await db.pet.findAll();

    const modifiedPets = pets.map((record) => {
      if (record.image) {
        record.image = record.image.toString("base64");
      } else {
        record.image = null;
      }
      return record;
    });
    res.json(modifiedPets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating availability: " + error.message });
  }
};

// update pet info
exports.updatePet = async (req, res) => {
  const base64Image = req.body.image;
  const byteaData = Buffer.from(base64Image, "base64");
  try {
    Pet.update(
      {
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
        admin_check: req.body.admin_check,
      },
      { where: { id: req.body.id } }
    );

    res.status(200).send({ message: "Update successfully" });
  } catch (error) {
    res.status(500).send({ message: "update failed" });
  }
};
