const user = require('../models/user.js');
const bcrypt = require('bcrypt');

const signIn = async (req, res) => {
  try {
    const { username, password, remember } = req.body;
    
    const userFound = await user.findOne({ username: username });

    if (!userFound) {
      res.status(400).json({ message: "Invalid account" });
    } else {
      const validate = bcrypt.compareSync(password, userFound.password);
      if (!validate) {
        return res.status(400).json({ message: "Wrong password" });
      } else {
        if(remember) await res.cookie("token", userFound._id.toString(), { maxAge: 365 * 24 * 60 * 60 * 1000, httpOnly: false, samesite: "none" });
        else await res.cookie("token", userFound._id.toString(), { maxAge: 12 * 60 * 60 * 1000, httpOnly: false, samesite: "none" });        
        return res.status(200).json({ message: "Login success", token: userFound._id });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error});
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
    const { oldPassword, newPassword } = req.body;
    const userId = req.cookies.token;
    
    const userFound = await user.findOne({ _id: userId });
    console.log(userFound);
    
    const validate = bcrypt.compareSync(oldPassword, userFound.password);
    console.log(validate);
    
    if (!validate) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    userFound.password = hash;
    await userFound.save();
    res.status(200).json({ message: "Password updated", token: userFound._id });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { signIn, signUp, changePassword };
