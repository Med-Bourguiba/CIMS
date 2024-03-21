const express = require("express");
const route = express.Router();
const rdvController = require("../controllers/rdv.controller");
const otpController =  require("../controllers/otp.controller");



route.post("/signin", rdvController.signin);
route.post("/sendOtp", otpController.sendOTP);
route.post("/verifyOTP", otpController.verifyOTP);


module.exports = route;