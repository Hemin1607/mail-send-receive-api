var express = require("express");
var router = express.Router();
const sendEmail = require('./sendMail.ts')
const readEmail = require('./readEmail.ts')


router.post("/senduseremail",sendEmail.sendEmail);

router.post("/getuseremail",readEmail.readEmail);

module.exports = router;
