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
    const { payment_id } = req.body;
    const payment = await Payment.findOne({ payment_id });

    if (!payment) {
      return res.status(404).json({ message: 'Thanh toán không tồn tại' });
    }

    // Kiểm tra nếu trạng thái đã là "Đã thanh toán"
    if (payment.status === 'Đã thanh toán') {
      return res.status(400).json({ message: 'Thanh toán đã được hoàn tất' });
    }

    // Cập nhật trạng thái thanh toán
    payment.status = 'Đã thanh toán';
    await payment.save();

    res.status(200).json({ message: 'Thanh toán đã được cập nhật thành công', payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
};

//[POST] /payments/api/v1/changes
module.exports.changePayments = async (req,res) => {
  const { payment_ids } = req.body; // Gửi danh sách payment_id qua body
  try {
    // Kiểm tra nếu không có payment_ids
    if (!payment_ids || !Array.isArray(payment_ids) || payment_ids.length === 0) {
      return res.status(400).json({ message: 'Danh sách payment_id không hợp lệ' });
    }

    // Cập nhật nhiều thanh toán
    const updatedPayments = await Payment.updateMany(
      { payment_id: { $in: payment_ids }, status: 'Chưa thanh toán' },  // Tìm các payment chưa thanh toán
      { $set: { status: 'Đã thanh toán' } }
    );

    if (updatedPayments.nModified === 0) {
      return res.status(404).json({ message: 'Không tìm thấy thanh toán nào cần thay đổi' });
    }

    res.status(200).json({ message: 'Cập nhật thanh toán thành công', updatedPayments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi máy chủ' });
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

// Hàm tự động tạo payment mỗi tháng
const generatePaymentID = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};
const calulateDueDate = (monthsToAdd) => {
  const now = new Date();
  const dueDate = new Date(now);

  dueDate.setMonth(now.getMonth() + monthsToAdd);
  return dueDate;
};
module.exports.autoGeneratePayments = async () => {
  try {
    const mandatoryFees = await Fee.find({status:"Bắt buộc"});

    for (const fee of mandatoryFees){
      const paymentID = generatePaymentID();

      const dueDate = calulateDueDate(fee.due);
      //Do hàm getMonth() trong Javascript trả về giá trị từ 0-11 nên phải +1
      const newPayment = new Payment({
        fee_id: fee.id,
        household_id: fee.household,
        amount : fee.amount,
        payment_date: dueDate,
        status: "Chưa thanh toán",
        name: `${fee.name} tháng ${dueDate.getMonth() + 1}/${dueDate.getFullYear()}`,
        payment_id: paymentID,
      });
      await newPayment.save();
    }
  } catch (error) {
    console.error("Lỗi khi tạo payment tự động:", error);
  }
}