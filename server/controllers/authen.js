const user = require('../models/user.js');
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userFound = await user.findOne({ username: username });

    if (!userFound) {
      res.status(400).json({ message: "Invalid account" });
    } else {
      const validate = await bcrypt.compare(password, userFound.password);
      if (!validate) {
        return res.status(400).json({ message: "Wrong password" });
      } else {
        return res.status(200).json(userFound);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const signUp = async (req, res) => {
  try {
    const { username, name, password } = req.body;
    const userFound = await user.findOne({ username: username });

    if (!userFound) {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(password, salt);
      const newUser = new user({
        fullname: name,
        username: username,
        password: hash
      });
      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res.status(400).json({ message: "Duplicate user" });
    }
  } catch(error) {
    res.status(500).json(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;
    const userFound = await user.findOne({ username });
    const validate = await bcrypt.compare(oldPassword, userFound.password);
    if (!validate) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    userFound.password = hash;
    await userFound.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json(error);
  }
};

export { signIn, signUp, changePassword };
