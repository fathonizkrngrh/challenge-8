const express = require("express");
const router = express.Router({ mergeParams: true });
const c = require("../controller/payment.controller");

router.post("/confirmation", c.paymentConfirmation);
router.get("/success", c.paymentSuccess);

module.exports = router;
