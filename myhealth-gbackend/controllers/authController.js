const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

let users = [];

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword
  };

  users.push(user);

  res.status(201).json({
    message: "User registered successfully",
    user
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    "mysecretkey",   // MUST MATCH authMiddleware
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token
  });
};

module.exports = { registerUser, loginUser };