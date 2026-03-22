//```javascript
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  createDoctor, 
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  searchDoctors,
} = require("../controllers/doctorController");

const { createDoctorValidator } = require("../validators/doctorValidator"); 

router.post(
  "/",
  [
    body("name").notEmpty(),
    body("specialization").notEmpty(),
    body("city").notEmpty(),
    body("consultationFee").isNumeric(),
  ],
  createDoctor
);

// Create doctor
router.post("/", createDoctor);

// Search doctors
router.get("/search", searchDoctors);

// Get all doctors
router.get("/", getDoctors);

// Get doctor by id
router.get("/:id", getDoctorById);

// Update doctor
router.put("/:id", updateDoctor);

// 
router.post("/", createDoctorValidator, createDoctor);

// Delete doctor
router.delete("/:id", deleteDoctor);

module.exports = router;

