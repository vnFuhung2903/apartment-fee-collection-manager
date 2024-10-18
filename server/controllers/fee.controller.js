const Fee = require("../models/fee.js");
const searchHelper = require("../helpers/search.js");
//[GET] fees/api/v1/fees
module.exports.index = async (req, res) => {
  try {
    const find = {};
    if (req.query.name) {
      find.name = req.query.name;
    }
    //Search
    let objectSearch = searchHelper(req.query);
    if (req.query.keyword) {
      find.name = objectSearch.regex;
    }
    //End Search
    //Sort
    const sort = {};
    if (req.query.sortKey && req.query.sortValue) {
      sort[req.query.sortKey] = req.query.sortValue;
    }
    //End Sort
    const fees = await Fee.find(find).sort(sort);
    if (!fees) {
      return res.status(404).json({ message: "Not Found" });
    } else {
      res.json(fees);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
//[POST] /fees/api/v1/post
module.exports.addFee = async (req, res) => {
  try {
    const { name,amount,due,status } = req.body;

    const fee = new Fee({
      name: name,
      amount: amount,
      due: due,
      status: status,
    });

    await fee.save();

    res.status(201).json(fee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating fee", error });
  }
};
