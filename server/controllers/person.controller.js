const person = require('../models/person.js');
const mongoose = require('mongoose');


const createPerson = async (req, res) => {
  try {
    const { name, cic, dob, nationality, occupation, gender, hometown, ethnic, phone, status } = req.body;
    const personFound = await person.findOne({ cic: cic });
    if(personFound)
      res.status(200).json(personFound._id);
    else {
      const newPerson = new person({
        name: name,
        cic: cic,
        gender: gender,
        dob: dob,
        status: status,
        ethnicity: ethnic,
        nation: nationality,
        hometown: hometown,
        contact_phone: phone,
        movingIn: Date.now(),
        occupation: occupation
      });
      await newPerson.save();
      res.status(200).json(newPerson._id);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const editPerson = async (req, res) => {
  try {
    const id = req.params.personId;
    const { name, gender, dob, status }  = req.params;
    const personFound = await person.findOne({ _id: id });

    if (personFound.name !== name) {
        personFound.name = name;
    }
    
    if (personFound.gender !== gender) {
        personFound.gender = gender;
    }
    
    if (personFound.dob !== dob) {
        personFound.dob = dob;
    }

    if (personFound.status !== status) {
        personFound.status = status;
    }
    await personFound.save();
    res.status(200).json(personFound);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePerson = async (req, res) => {
  try {
    const id = req.params.personId;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json('Invalid person');

    const personFound = await person.findOne({ _id: id });
    if(!personFound) res.status(400).json('Invalid person');

    await person.deleteOne({ _id: id });
    res.status(200).json('Delete complete');
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPersonDetail = async (req, res) => {
  try {
    const id = req.params.personId;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json('Invalid person');

    const personFound = await person.findOne({_id: id.toString(),});
    if(!personFound)  res.status(400).json('Invalid person');

    res.status(200).json(personFound._doc);
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
