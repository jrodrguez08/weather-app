const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const saltRounds = 5;

const userService = {
  getUser: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).exec();
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().exec();
      res.status(200).json({ users });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const body = { name, lastName, email, password: hashedPassword };
      await new User(body).save();
      res.status(201).json({ meesage: 'user created' });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};

module.exports = userService;
