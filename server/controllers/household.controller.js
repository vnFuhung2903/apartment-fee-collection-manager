const mongoose = require('mongoose');
const person = require('../models/person.js');
const household = require('../models/household.js');
const apartment = require('../models/apartment.js');

const getHouseholds = async (req, res) => {
  try {
    const {id} = req.query;
    const conditions = {};
    if (id) {
      conditions._id = id;
    }
    let householdsFound = await household.find(conditions);
    let json = [];
    let status = 'Thường trú' 
    for(const data of householdsFound) {
      let numbers = [], floors = [];
      const head = await person.findOne({ _id: data.head });
      for(const ID of data.apartments) {
        const owned = await apartment.findOne({ _id: ID });
        numbers.push(owned.number);
        floors.push((Number(owned.number) / 100).toFixed(0));
      }
      if(head.temporary_absence)    status = 'Tạm vắng';
      if(head.temporary_residence)  status = 'Tạm trú';
      json.push({id:data._id,head: head.name, contact: data.contact_phone, status: status, floors: floors, numbers: numbers});
    }
    res.status(200).json(json);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createHousehold = async (req, res) => {
  try {
    const { apartmentNumber, headId, contact } = req.body;
    const apartmentFound = await apartment.findOne({ number: apartmentNumber });
    if(apartmentFound.household)
      res.status(200).json({ message: "In used" });
    else {
      const newHousehold = new household({
        head: headId,
        apartment_number: apartmentNumber,
        contact_phone: contact,
        members: []
      });
      await newHousehold.save();
      apartmentFound.household = newHousehold._id;
      await apartmentFound.save();
      res.status(200).json({ message: "Success", household: newHousehold });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const editHousehold = async (req, res) => {
  try {
    const { id, apartmentNumber, headId, relationship }  = req.body;
    const householdFound = await household.findOne({ _id: id });

    if (householdFound.apartment_number !== apartmentNumber) {
      householdFound.apartment_number = apartmentNumber;
    }

    if (householdFound.head !== headId) {
      if (householdFound.head) {
        const oldHead = await person.findOne({ _id: householdFound.head });
        const newHead = await person.findOne({ _id: headId });

        oldHead.relation_to_owner = relationship;
        newHead.relation_to_owner = "Owner";
        await oldHead.save();
        await newHead.save();

        householdFound.members = householdFound.members.filter((personId) => personId !== newHead._id);
        if(relationship !== null) householdFound.members.push(oldHead._id);
        householdFound.head = headId;
      } else {
        const newHead = await person.findOne({ _id: headId });
        newHead.relation_to_owner = "Owner";
        await newHead.save();

        householdFound.members = householdFound.members.filter((personId) => personId !== newHead._id);
        householdFound.head = headId;
      }
    }
    await householdFound.save();
    res.status(200).json(householdFound);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteHousehold = async (req, res) => {
  try {
    const id = req.body.householdId;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json('Invalid household');

    const householdFound = await household.findOne({ _id: id });
    if(!householdFound) res.status(400).json('Invalid household');

    if (householdFound.head) {
      await person.deleteOne({ _id: householdFound.head });
    }
  
    householdFound.members.forEach(async (memberId) => {
      await person.deleteOne({ _id: memberId });
    });

    await household.deleteOne({ _id: id });
    res.status(200).json('Delete complete');
  } catch (error) {
    res.status(500).json(error);
  }
};

const getHouseholdDetail = async (req, res) => {
  try {
    const id = req.body.householdId;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json('Invalid household');

    const householdFound = await household.findOne({_id: id.toString(),});
    if(!householdFound)  res.status(400).json('Invalid household');

    res.status(200).json(householdFound._doc);
  } catch (error) {
    res.status(500).json(error);
  }
};

const editHouseholdMember = async (req, res) => {
  try {
    const id = req.params.householdId;
    const members = req.body;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json('Invalid household');

    const householdFound = await household.findOne({ _id: id });
    if(!householdFound) res.status(400).json('Invalid household');
  
    householdFound.members = householdFound.members.filter((personId) => members.includes(personId.toString()));
    const newMembers = members.filter((personId) => !householdFound.members.includes(personId));
    for(const member of newMembers)
      householdFound.members.push(member);
    res.status(200).json(householdFound);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getHouseholds,
  createHousehold,
  editHousehold,
  deleteHousehold,
  getHouseholdDetail,
  editHouseholdMember
};
