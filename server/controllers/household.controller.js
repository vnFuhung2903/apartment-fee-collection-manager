const mongoose = require('mongoose');
const person = require('../models/person.js');
const household = require('../models/household.js');
const apartment = require('../models/apartment.js');

const getHouseholds = async (req, res) => {
  try {
    const { id } = req.query;
    const conditions = id ? { _id: id } : {};
    // Pagination
    let objectPagination = {
      currentPage: 1,
      limitItem: 8,
    };

    if (req.query.page) {
      objectPagination.currentPage = parseInt(req.query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;
    const countHouseholds = await household.countDocuments(conditions);
    const totalPage = Math.ceil(countHouseholds / objectPagination.limitItem);
    objectPagination.totalPage = totalPage;
    //End Pagination

    let householdsFound = await household.find(conditions).skip(objectPagination.skip).limit(objectPagination.limitItem);
    let json = [];
    for(const data of householdsFound) {
      const head = await person.findOne({ _id: data.head });
      // console.log('head', head);
      
      const ownedApartments = await Promise.all(data.apartments.map(ID => apartment.findOne({ _id: ID })))
      const numbers = ownedApartments.map(owned => owned.number);
      const floors = ownedApartments.map(owned => (Number(owned.number) / 100).toFixed(0));
      
      json.push({ id: data._id, 
        head: head.name, 
        contact: data.contact_phone, 
        status: head.status, 
        floors: floors, 
        numbers: numbers ,
        pagination: {
          currentPage: objectPagination.currentPage,
          totalPage: objectPagination.totalPage,
          limitItem: objectPagination.limitItem,
          totalItems: countHouseholds,
        }, 
    });
    }
    res.status(200).json(json);
  } catch (error) {
    res.status(500).json(error);
  }
};

const createHousehold = async (req, res) => {
  try {
    const { number, id, contact_phone, ...householdInfo } = req.body;
    let apartmentFound = await apartment.findOne({ number: number });
    if(apartmentFound && apartmentFound.household)
      res.status(402).json({ message: "In used" });
    else {
      if(!apartmentFound) {
        apartmentFound = new apartment({
          household: null,
          number: Number(number),
          type: "Căn hộ chung cư",
          totalArea: 85
        })
      }

      const newHousehold = new household({
        head: id,
        apartments: [apartmentFound._id],
        contact_phone,
        members: []
      });

      await newHousehold.save();
      apartmentFound.household = newHousehold._id;
      await apartmentFound.save();
      res.status(200).json({ message: "Success", household: newHousehold._id });
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
    res.status(200).json({ message: "Success", household: householdFound._id });
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
    res.status(200).json({ message: "Delete complete" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getHouseholdDetail = async (req, res) => {
  try {
    const { householdId } = req.query;
    if (!mongoose.isValidObjectId(householdId))
      return res.status(400).json({ message: 'Invalid household' });
    
    const householdFound = await household.findOne({ _id: householdId });

    if(!householdFound)  
      return res.status(400).json({ message: 'Invalid household' });
    let json = householdFound._doc;
    let mem = [];
    [json.head, mem, json.apartments] = await Promise.all([
      person.findOne({ _id: householdFound.head }),
      Promise.all(householdFound.members.map(member => person.findOne({ _id: member.member_id }))),

      // WARNING: only 1 apartment case
      apartment.findOne({ _id: householdFound.apartments[0] })
    ]);

    json.members = json.members.map((_, i) => ({
      ...mem[i]._doc,
      relation_to_head: householdFound.members[i].relation_to_head
    }));
    
    res.status(200).json({ message: "Success", household: json });
  } catch (error) {
    res.status(500).json(error);
  }
};

const editHouseholdMember = async (req, res) => {
  try {
    const id = req.query;
    const { member_id, relation_to_head } = req.body;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json({ message: 'Invalid household' });

    const householdFound = await household.findOne({ _id: id });
    if(!householdFound) 
      res.status(400).json({ message: 'Invalid household' });
  
    const members = householdFound.members.map(person => person.member_id !== member_id);
    members.push({ member_id, relation_to_head });
    householdFound.members = members;
    await householdFound.save();
    res.status(200).json({ message: "Success", household: householdFound._id });
  } catch (error) {
    res.status(500).json(error);
  }
};

const addNewMember = async (req, res) => {
  try {
    const { number, id, relationToOwner, ...householdInfo } = req.body;
    const apartmentFound = await apartment.findOne({ number: number });
    if(!apartmentFound.household)
      return res.status(402).json({ message: "Invalid apartment" });
    const householdFound = await household.findOne({ _id: apartmentFound.household });
    if(!householdFound) 
      return res.status(402).json({ message: 'Invalid household' });
    
    if(householdFound.members.includes({ member_id: id, relation_to_head: relationToOwner }))
      return res.status(407).json({ message: "Person is already in household" })
    householdFound.members.push({ member_id: id, relation_to_head: relationToOwner });

    await householdFound.save();
    return res.status(200).json({ message: "Success", household: householdFound._id });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteHouseholdMember = async (req, res) => {
  try {
    const id = req.query;
    if (!mongoose.isValidObjectId(id))
      res.status(400).json({ message: 'Invalid household' });

    const householdFound = await household.findOne({ _id: id });
    if(!householdFound) 
      res.status(400).json({ message: 'Invalid household' });
  
    await Promise.all(householdFound.members.map(per => person.deleteOne(per.member_id)));
    householdFound.members = [];
    await householdFound.save();
    res.status(200).json({ message: "Success", household: householdFound._id });
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
  addNewMember,
  editHouseholdMember,
  deleteHouseholdMember
};
