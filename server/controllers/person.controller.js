const person = require('../models/person.js');
const mongoose = require('mongoose');


const createPerson = async (req, res) => {
  try {
    const reqPerson = req.body;
    const personFound = await person.findOne({ cic: reqPerson.cic });
    if(personFound)
      res.status(402).json({ message: "User found" });
    else {
      const newPerson = new person({
        ...reqPerson,
        movingIn: Date.now(),
      });
      await newPerson.save();
      res.status(200).json({ message: "Success", person: newPerson._id });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const editPerson = async (req, res) => {
  try {
    const { id } = req.query;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json({ message: 'Invalid person' });

    const reqPerson = req.body;
    const personFound = await person.findOne({ _id: id });

    if(!personFound)
      return res.status(402).json({ message: "User found" })

    personFound = {...reqPerson};
    await personFound.save();
    res.status(200).json({ message: "Success", person: personFound._id });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePerson = async (req, res) => {
  try {
    const { id } = req.query;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json({ message: 'Invalid person' });

    const personFound = await person.findOne({ _id: id });
    if(!personFound) 
      res.status(400).json({ message: 'Invalid person' });

    await person.deleteOne({ _id: id });
    res.status(200).json({ message: "Delete complete" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPersonDetail = async (req, res) => {
  try {
    const { id } = req.query;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json({ message: 'Invalid person' });

    const personFound = await person.findOne({_id: id.toString(),});
    if(!personFound)  
      res.status(400).json({ message: 'Invalid person' });

    res.status(200).json({ message: "Success", person: personFound });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getFilterdList = async (req, res) => {
    try {
      const { name, gender, status } = req.body;
      let listFiltered = await person.find();
      if(name !== null)  listFiltered = listFiltered.filter((personFound) => personFound.name === name);
      if(gender !== null)  listFiltered = listFiltered.filter((personFound) => personFound.gender === gender);
      if(status !== null) listFiltered = listFiltered.filter((personFound) => personFound.status === status);
      res.status(200).json(listFiltered);
    } catch (error) {
      res.status(500).json(error);
    }
  };

module.exports = {
  createPerson,
  editPerson,
  deletePerson,
  getPersonDetail
};
