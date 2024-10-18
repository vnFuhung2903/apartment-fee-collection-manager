const Payment = require("../models/payment.js");

//[GET] api/v1/payments
module.exports.index = async (req,res) => {
  try{
    const find = {};
    if(req.query.fee_id){
      find.fee_id = req.query.fee_id;
    }
    if(req.query.household_id){
      find.household_id = req.query.household_id;
    }
      const payments = await Payment.find(find);
      if (!payments) {
        return res.status(404).json({ message: "Not Found" });
      }
      else {
        res.json(payments);
      }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};



