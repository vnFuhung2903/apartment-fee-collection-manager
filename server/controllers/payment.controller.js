const Payment = require("../models/payment.js");
//[GET] payments/api/v1/payments
module.exports.index = async (req, res) => {
  try {
    const find = {};
    if (req.query.fee_id) {
      find.fee_id = req.query.fee_id;
    }
    if (req.query.household_id) {
      find.household_id = req.query.household_id;
    }
    //Sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    }
    //End Sort
    const payments = await Payment.find(find).sort(sort);
    if (!payments) {
      return res.status(404).json({ message: "Not Found" });
    } else {
      res.json(payments);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
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
