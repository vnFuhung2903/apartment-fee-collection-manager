const Fee = require("../models/fee.js");
//[GET] /fees
module.exports.index = async (req,res) => {
    const fees = await Fee.find();
    res.json(fees);
}  
//[GET] /check/fee/household/:id
//   module.exports.checkFee = async (req,res) => {
//     try {
//       const household_id = req.params.id;
//       const fee = await Fee.find({
//         _id:household_id
//       });
//       res.json(fee);
//     } catch(error){
//       console.error('Error:', error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   }