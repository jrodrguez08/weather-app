import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const userController = {
  getUser: async (req, res) => {
    try {
      const { email } = req.params;
      const user = await User.findById(email).exec();
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
      const saltRounds = 5;
      const { name, lastName, email, password } = req.body;
      const emailExists = await User.findOne({ email }).exec();
      if (emailExists) {
        res.status(409).json({ message: 'email already taken' });
        return;
      }
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      const body = { name, lastName, email, password: hashedPassword };
      await new User(body).save();
      res.status(201).json({ meesage: 'user created' });
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).exec();
      if (!user) {
        res.status(400).json({ message: 'email does not exist' });
        return;
      }
      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        res.status(400).json({ message: 'password does not match' });
        return;
      }
      const token = jwt.sign({ user }, process.env.JWT_SECRET);
      res.header('Auth-Token', token).json({ token, message: 'logged in' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

};

export default userController;
