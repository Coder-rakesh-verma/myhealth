lear// ```javascript
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");

// Create Appointment (with double booking prevention)
exports.createAppointment = async (req, res) => {
  try {
    const { doctor, date, time } = req.body;

    // Check if doctor exists
    const doctorData = await Doctor.findById(doctor);

    if (!doctorData) {
      return res.status(404).json({
        message: "Doctor not found"
      });
    }

    // Check doctor availability
    if (!doctorData.isAvailable) {
      return res.status(400).json({
        message: "Doctor not available for booking"
      });
    }

    // Prevent double booking
    const existingAppointment = await Appointment.findOne({
      doctor,
      date,
      time,
      status: "booked"
    });

    if (existingAppointment) {
      return res.status(400).json({
        message: "This time slot is already booked for this doctor"
      });
    }

    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();

    res.status(201).json(savedAppointment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctor");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointments for a specific doctor
exports.getDoctorAppointments = async (req, res) => {
  try {
    const appointments = await Appointment
      .find({ doctor: req.params.doctorId })
      .populate("doctor")
      .sort({ date: 1, time: 1 });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Available Slots for a Doctor
exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.params;

    const bookedAppointments = await Appointment.find({
      doctor: doctorId,
      date: date,
      status: "booked",
    });

    const bookedSlots = bookedAppointments.map((a) => a.time);

    const allSlots = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
    ];

    const availableSlots = allSlots.filter(
      (slot) => !bookedSlots.includes(slot)
    );

    res.json({ availableSlots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Doctor Daily Schedule (slot + status)
exports.getDoctorSchedule = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    const allSlots = [
      "09:00 AM",
      "09:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "02:00 PM",
      "02:30 PM",
      "03:00 PM",
      "03:30 PM",
      "04:00 PM",
      "04:30 PM",
    ];

    const appointments = await Appointment.find({
      doctor: doctorId,
      date,
      status: "booked",
    });

    const bookedSlots = appointments.map((a) => a.time);

    const schedule = allSlots.map((slot) => ({
      time: slot,
      status: bookedSlots.includes(slot) ? "booked" : "available",
    }));

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Appointment Status
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// direct cancellation by patient
exports.cancelAppointment = async (req, res) => {
  try {

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "cancelled" },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found"
      });
    }

    res.json(appointment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Appointments by Patient Email
exports.getPatientAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      patientEmail: req.params.email,
    }).populate("doctor");

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Upcoming Appointments
exports.getUpcomingAppointments = async (req, res) => {
  try {

    const today = new Date().toISOString().split("T")[0];

    const appointments = await Appointment.find({
      doctor: req.params.doctorId,
      date: { $gte: today },
      status: "booked"
    })
    .populate("doctor")
    .sort({ date: 1, time: 1 });

    res.json(appointments);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found",
      });
    }

    res.json({
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get Appointment Stats Summary
exports.getAppointmentStats = async (req, res) => {
  try {

    const total = await Appointment.countDocuments();

    const booked = await Appointment.countDocuments({ status: "booked" });

    const cancelled = await Appointment.countDocuments({ status: "cancelled" });

    const completed = await Appointment.countDocuments({ status: "completed" });

    res.json({
      total,
      booked,
      cancelled,
      completed
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};