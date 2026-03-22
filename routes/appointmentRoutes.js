//```javascript
const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
  getDoctorAppointments,
  getAvailableSlots,
  getDoctorSchedule,
  updateAppointmentStatus,
  getPatientAppointments,
  getUpcomingAppointments,
  deleteAppointment,
} = require("../controllers/appointmentController");


// Create appointment
router.post("/", createAppointment);

// Get all appointments
router.get("/", getAppointments);

// Doctor appointments
router.get("/doctor/:doctorId", getDoctorAppointments);

// Patient appointments
router.get("/patient/:email", getPatientAppointments);

// Available slots
router.get("/available-slots/:doctorId/:date", getAvailableSlots);

// Doctor schedule
router.get("/doctors/:doctorId/schedule", getDoctorSchedule);

// Upcoming appointments
router.get("/upcoming/:doctorId", getUpcomingAppointments);

// Update status
router.put("/:id/status", updateAppointmentStatus);

// Cancel appointment
router.put("/:id/cancel", cancelAppointment);

// Stats summary
router.get("/stats/summary", getAppointmentStats);

// Delete appointment
router.delete("/:id", deleteAppointment);

module.exports = router;

