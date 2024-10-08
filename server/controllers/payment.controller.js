const Payment = require("../models/payment.js");

//[GET] /payments
module.exports.index = async (req,res) => {
    const payments = await Payment.find();
    res.json(payments);
}

// [GET] /payments/detail/household/:id
module.exports.detail = async (req, res) => {
    try {
      const household_id = req.params.id;
    //   console.log(household_id);
      const payment = await Payment.findOne({
        household_id: household_id
      });
      
      if (!payment) {
        return res.status(404).json({ message: "Not Found" });
      }
      
      res.json(payment);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: "Server Error" });
    }
  };

