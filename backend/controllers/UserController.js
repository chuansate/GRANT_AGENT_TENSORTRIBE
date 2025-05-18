const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key_here";

// Get all users
const getUsers = async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Get user by ID
const getUserById = async (req, res) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

// Create new user (registration)
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Hash password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Update user (basic fields)
const updateUser = async (req, res) => {
  const { name, email } = req.body;
  try {
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: { name, email },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// Login user (auth & token issuance)
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ msg: "Email and password required" });

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user)
      return res.status(401).json({ msg: "Invalid email or password" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ msg: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      userId: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  loginUser,
};
