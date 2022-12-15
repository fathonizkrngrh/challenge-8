const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const biodataRouter = require("./user_game_biodata.route");
const historyRouter = require("./user_game_history.route");
const mediaRouter = require("./media.route");
const paymentRouter = require("./payment.route");

router.use("/auth", authRouter);
router.use("/history", historyRouter);
router.use("/bio", biodataRouter);
router.use("/media", mediaRouter);
router.use("/payment", paymentRouter);

module.exports = router;
