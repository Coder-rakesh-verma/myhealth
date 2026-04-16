const { body } = require("express-validator");

exports.createDoctorValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  body("specialization").notEmpty(),
  body("city").notEmpty(),
  body("consultationFee").isNumeric()
];