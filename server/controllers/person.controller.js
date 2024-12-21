const person = require('../models/person.js');
const household = require('../models/household.js');
const apartment = require('../models/apartment.js');
const mongoose = require('mongoose');


const createPerson = async (req, res) => {
  try {
    const reqPerson = req.body;
    const personFound = await person.findOne({ cic: reqPerson.cic });
    if(personFound)
      res.status(402).json({ message: "User found", person: personFound._id });
    else {
      const newPerson = new person({
        ...reqPerson
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
      return res.status(402).json({ message: 'Invalid person' });

    const { householdId, numbers, floors, ...reqPerson } = req.body;
    let personFound = await person.findOne({ _id: id });

    if(!personFound)
      return res.status(402).json({ message: "Invalid person" });
    Object.keys(reqPerson).forEach(key => {
      personFound[key] = reqPerson[key];
    });
    await personFound.save();

    if(numbers) {
      if (!mongoose.isValidObjectId(householdId))
        return res.status(402).json({ message: 'Invalid household' });
      let householdFound = await household.findOne({ _id: householdId });

      // WARNING: only 1 apartment case
      if(floors !== (numbers / 100).toFixed(0))
        return res.status(409).json({ message: "Apartment's not in the same floor" });
      console.log(householdFound.apartments[0]);
      let [apartmentFound, oldApartment] = await Promise.all([ apartment.findOne({ number: Number(numbers) }), apartment.findOne({ _id: householdFound.apartments[0] }) ]);
      if(!apartmentFound) {
        apartmentFound = new apartment({
          household: householdId,
          number: Number(numbers),
          type: "Căn hộ chung cư",
          totalArea: 85
        })
      } else apartmentFound.household = householdId;
      
      householdFound.apartments[0] = apartmentFound._id;
      oldApartment.household = null;
      await Promise.all([householdFound.save(), oldApartment.save(), apartmentFound.save()]);
    }
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

const getPersonAll = async (req, res) => {
  try {
    // Pagination
    let objectPagination = {
      currentPage: 1,
      limitItem: 8, 
    };

    if (req.query.page) {
      objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    const totalHouseholds = await household.countDocuments();
    const totalPage = Math.ceil(totalHouseholds / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;

    let householdsFound = await household.find({}).skip(objectPagination.skip).limit(objectPagination.limitItem);;
    let json = [];
    for(const data of householdsFound) {
      const [head, mem, ownedApartments] = await Promise.all([
        person.findOne({ _id: data.head }),
        Promise.all(data.members.map(member => person.findOne({ _id: member.member_id }))),
        Promise.all(data.apartments.map(ID => apartment.findOne({ _id: ID }))),
      ]);
      const numbers = ownedApartments.map(owned => owned.number);
      const floors = ownedApartments.map(owned => (Number(owned.number) / 100).toFixed(0));
      json.push({
        ...head._doc,
        householdId: data._id,
        floors: floors,
        numbers: numbers,
        pagination: {
          currentPage: objectPagination.currentPage,
          totalPage: objectPagination.totalPage,
          limitItem: objectPagination.limitItem,
          totalItems: totalHouseholds,
        },
      });
      mem.forEach((member) => {
        return json.push({
          ...member._doc,
          householdId: data._id,
          floors: floors,
          numbers: numbers,
          pagination: {
            currentPage: objectPagination.currentPage,
            totalPage: objectPagination.totalPage,
            limitItem: objectPagination.limitItem,
            totalItems: totalHouseholds,
          },
        });
      });
    }
    res.status(200).json(json);
  } catch (error) {
    res.status(500).json(error);
  }
} 


module.exports = {
  createPerson,
  editPerson,
  deletePerson,
  getPersonDetail,
  getPersonAll,
  getFilterdList
};
