const { user_game_biodata, user_game } = require("../models");
const jwt = require("jsonwebtoken");

const { JWT_SIGNATURE_KEY } = process.env;

module.exports = {
  mustlogin: (req, res, next) => {
    try {
      const bearer = req.headers["authorization"];
      if (!bearer)
        return res.status(401).json({
          status: false,
          message: "you're not authorized",
          data: null,
        });

      const token = bearer.split(" ")[1];
      if (!token)
        return res.status(401).json({
          status: false,
          message: "you're not authorized",
          data: null,
        });

      const decoded = jwt.verify(token, JWT_SIGNATURE_KEY);
      req.user = decoded;

      next();
    } catch (err) {
      if (err.message == "jwt malformed") {
        return res.status(401).json({
          status: false,
          message: err.message,
          data: null,
        });
      }
      next(err);
    }
  },
  isUserExist: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await user_game.findOne({
        where: { id: userId },
      });
      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "user doesn't exist",
        });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },

  bioMustExist: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userBiodata = await user_game_biodata.findOne({
        where: { user_id: userId },
      });
      if (!userBiodata) {
        return res.status(404).json({
          status: "failed",
          message: `biodata doesn't exist`,
        });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },
  isBioExist: async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userBiodata = await user_game_biodata.findOne({
        where: { user_id: userId },
      });
      if (userBiodata) {
        return res.status(409).json({
          status: "failed",
          message: `biodata already exist`,
        });
      }
      next();
    } catch (error) {
      console.log(error);
    }
  },
};
