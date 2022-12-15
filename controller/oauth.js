const { user_game } = require("../models");
const roles = require("../utils/users/role");
const userType = require("../utils/users/provider");
const googleOauth2 = require("../utils/oauth/google");

module.exports = {
  google: async (req, res, next) => {
    try {
      const code = req.query.code;

      if (!code) {
        const url = googleOauth2.generateAuthURL();
        return res.redirect(url);
      }
      await googleOauth2.setCredentials(code);
      const { data } = await googleOauth2.getUserData();
      console.log(data);
      let userExist = await user_game.findOne({ where: { email: data.email } });
      if (!userExist) {
        userExist = await user.create({
          username: data.name,
          email: data.email,
          user_type: userType.google,
          role: roles.user,
        });
      }
      const payload = {
        id: userExist.id,
        username: userExist.username,
        email: userExist.email,
        user_type: userExist.user_type,
        role: userExist.role,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY);

      // return token
      return res.status(200).json({
        status: true,
        message: "success",
        data: {
          user_id: userExist.id,
          token,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
