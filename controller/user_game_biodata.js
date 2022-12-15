const { user_game_biodata } = require("../models");

module.exports = {
  addBio: async (req, res, next) => {
    try {
      const { userId } = req.params;

      const { first_name, last_name, telephone_number, birthdate } = req.body;
      const createdBio = await user_game_biodata.create({
        user_id: userId,
        first_name,
        last_name,
        telephone_number,
        birthdate,
      });

      return res.status(201).json({
        status: true,
        message: "success adding new bio",
        data: {
          user_id: createdBio.user_id,
          firstname: createdBio.first_name,
          lastname: createdBio.last_name,
          telephonenumber: createdBio.telephone_number,
          birthdate: createdBio.birthdate,
        },
      });
    } catch (err) {
      next(err);
    }
  },
  showAll: async (req, res, next) => {
    try {
      const users = await user_game_biodata.findAll();
      if (users.length <= 0) {
        res.status(409).json({
          status: false,
          message: "empty data",
          data: null,
        });
      }
      return res.status(200).json({
        status: true,
        message: "data showed successfull",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  },

  detailBio: async (req, res, next) => {
    const { userId } = req.params;
    const findBio = await user_game_biodata.findOne({
      where: { user_id: userId },
    });
    if (!findBio) {
      return res.status(409).json({
        status: false,
        message: "data not found",
        data: null,
      });
    }
    return res.status(200).json({
      status: true,
      message: "data has found",
      data: findBio,
    });
  },
  updatePhoneNumber: async (req, res, next) => {
    try {
      const { newPhoneNumber, confirmPhoneNumber } = req.body;
      if (newPhoneNumber !== confirmPhoneNumber) {
        return res.status(422).json({
          status: false,
          message: "New phonenumber doesn't match, please confirm again!!",
        });
      }

      const findBio = await user_game_biodata.findOne({
        where: { user_id: userId },
      });
      const updatedBio = await findBio.update({
        telephone_number: newPhoneNumber,
      });

      return res.status(200).json({
        status: true,
        message: "success change phone number",
        data: updatedBio,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteBio: async (req, res, next) => {
    const { userId } = req.params;
    try {
      const findBio = await user_game_biodata.findOne({
        where: { user_id: userId },
      });
      if (!findBio) {
        return res.status(404).json({
          status: false,
          message: "Bio not found!",
        });
      }
      let deletedBio = await findBio.destroy();
      return res.status(200).json({
        status: true,
        message: "bio deleted successfull",
        data: deletedBio,
      });
    } catch (err) {
      next(err);
    }
  },
};
