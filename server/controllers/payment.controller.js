const mongoose = require("mongoose");
const Payment = require("../models/payment.js");
const Fee = require("../models/fee.js");
const Household = require('../models/household.js');
const Person = require('../models/person.js');
//[GET] payments/api/v1/payments
module.exports.index = async (req, res) => {
  try {
    // Build query filter
    const filter = {};
    if (req.query.fee_id) {
      filter.fee_id = req.query.fee_id;
    }
    if (req.query.household_id) {
      filter.household_id = req.query.household_id;
    }
    if (req.query.status=='done'){
      filter.status='Đã thanh toán';
    }

    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = parseInt(req.query.sortValue) || 1;
    }else {
      sort.createdAt = -1;
    }
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    let query = Payment.find(filter)
      .sort(sort)
      .lean();
    
    //Limit
    if (limit && limit > 0) {
      query = query.limit(limit);
    }

    const payments = await query;

    if (!payments.length) {
      return res.status(404).json({ message: "No payments found" });
    }

    //Truy vấn tên hộ gia đình
    const householdIds = [...new Set(payments.map(payment => payment.household_id))];
    const households = await Household.find({
      _id: { $in: householdIds }
    }).lean();
    const householdMap = households.reduce((acc, household) => {
      acc[household._id.toString()] = household;
      return acc;
    }, {});

    const personIds = households.map(household => household.head).filter(Boolean);
    const persons = await Person.find({
      _id: { $in: personIds }
    }).select('name').lean();

    const personMap = persons.reduce((acc, person) => {
      acc[person._id.toString()] = person;
      return acc;
    }, {});

    
    // Lấy danh sách fee_id duy nhất từ payments
    const feeIDs = [...new Set(payments.map(payment => payment.fee_id).filter(Boolean))];
    const fees = await Fee.find({ 
      _id: { $in: feeIDs } 
    }).select('name').lean();

    const feeMap = fees.reduce((acc, fee) => {
      acc[fee._id.toString()] = fee.name;
      return acc;
    }, {});


    const results = payments.map(payment => {
      const household = householdMap[payment.household_id.toString()];
      const headPerson = household && household.head ? personMap[household.head.toString()] : null;
      return {
        ...payment,
        householdHead: headPerson ? headPerson.name : "Unknown",
        feeName: feeMap[payment.fee_id?.toString()] || "Unknown"
      };
    });
    res.json(results);

  } catch (error) {
    console.error('Payment index error:', error);
    res.status(500).json({ 
      message: "Server Error",
    });
  }
};

//[POST] /payments/api/v1/post
module.exports.addPayment = async (req, res) => {
  try {
    const { fee_id, household_id, amount, payment_date } = req.body;

    const payment = new Payment({
      fee_id: fee_id,
      household_id: household_id,
      amount,
      payment_date,
    });

    await payment.save();

    res.status(201).json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating payment", error });
  }
};

//[POST] /payments/api/v1/change
module.exports.changePayment = async (req,res) => {
  try {
    const { fee_id, household_id, amount } = req.body;
    await Payment.updateOne(
      {
        fee_id:fee_id,
        household_id:household_id
      },{
        amount:amount
      });

    res.status(201).json({message: "Update Amount Success"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Change Amount Error", error });
  }
};

//[POST] /payments/api/v1/delete
module.exports.deletePayment = async (req,res) => {
  try {
    const { fee_id, household_id } = req.body;
    await Payment.deleteOne(
      {
        fee_id:fee_id,
        household_id:household_id
      });

    res.status(201).json({message: "Delete Payment Success"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete Payment Error", error });
  }
};

//[GET] /payments/api/v1/totalPayment
module.exports.totalPayment = async (req,res) => {
  try {
    const findHousehold = {};
    const households = await Household.find(findHousehold);
    if(!households) {
      return res.status(404).json({ message: "Not Found" });
    } else {
      const results = [];
      for (const household of households) {
        const householdId = household._id;
        //Sum payments
        const  payments = await Payment.aggregate([
          {$match:{
            household_id:householdId.toString(),
          }},
          {$group:{_id:householdId.toString(),totalAmount: {$sum:"$amount"}}}
        ]);
        const  paymented = await Payment.aggregate([
          {$match:{
            household_id:householdId.toString(),
            status: { $ne: "Đã thanh toán" }
          }},
          {$group:{_id:householdId.toString(),totalAmount: {$sum:"$amount"}}}
        ]);
        //Nếu không có khoản thanh toán nào,sum = 0
        const payed = paymented.length > 0 ? paymented[0].totalAmount : 0;
        const totalAmount = payments.length > 0 ? payments[0].totalAmount : 0;
        //Thông tin chủ hộ
        const headPerson = await Person.findById(household.head).select('name');
        const headName = headPerson ? headPerson.name : "Unknown";

        results.push({
          household_id: householdId,
          headName,
          payed,
          totalAmount
        });
      }
      res.status(200).json({data:results});
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};