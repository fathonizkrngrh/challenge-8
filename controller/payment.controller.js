const sendEmail = require("../utils/mailer/send");
const { user_game } = require("../models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;
const ejs = require("ejs");
const path = require("path");

module.exports = {
  paymentConfirmation: async (req, res) => {
    const { email } = req.body;

    const user = await user_game.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "email not found",
      });
    }
    let template = "";
    const payload = {
      user_id: user.id,
    };
    const token = jwt.sign(payload, JWT_SECRET_KEY);
    const url = `http://localhost:3000/payment/success?token=${token}`;

    ejs.renderFile(
      path.join(__dirname, "..", "views", "payment/emailConfirmation.ejs"),
      {
        url,
      },
      (err, str) => {
        template = str;
      }
    );

    sendEmail(email, "Payment Confirmation", template);
    res.status(200).json({
      status: true,
      url,
    });
  },
  paymentSuccess: async (req, res) => {
    const { token } = req.query;
    const url = `http://localhost:3000/payment/success?token=${token}`;
    res.render("payment/success", { url });
  },
};
