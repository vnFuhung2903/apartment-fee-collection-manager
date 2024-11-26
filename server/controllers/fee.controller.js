const Fee = require("../models/fee.js");
const Household = require("../models/household.js");
const Payment = require("../models/payment.js");
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
    const { name, amount, due, status, households } = req.body;
    const fee = new Fee({
      name,
      amount,
      due,
      status,
    });
    await fee.save();

    let householdsToAddPayment = [];
    if (status === "Bắt buộc") {
      householdsToAddPayment = await Household.find({}, "_id");
    } else if (status === "Không bắt buộc" && households) {
      householdsToAddPayment = households.map((householdId) => ({ _id: householdId }));
    }

    const payments = householdsToAddPayment.map((household) => ({
      fee_id: fee._id,
      household_id: household._id,
      amount: fee.amount,
      payment_date: fee.due,
      status: "Chưa thanh toán",
    }));
    await Payment.insertMany(payments);

    res.status(201).json({ message: "Fee created successfully", fee });
  } catch (error) {
    console.error("Error creating fee:", error);
    res.status(500).json({ message: "Error creating fee", error });
  }
};

//[POST] /fees/api/v1/change
module.exports.changeFee = async (req, res) => {
  try {
    const { id, name, amount, due, status, households, ...otherFields } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Thiếu ID của phí cần cập nhật!!!!" });
    }

    const existingFee = await Fee.findById(id);
    if (!existingFee) {
      return res.status(404).json({ message: "Không tìm thấy phí với ID này." });
    }

    const updateFields = { ...otherFields };
    if (name !== undefined) updateFields.name = name;
    if (amount !== undefined) updateFields.amount = amount;
    if (due !== undefined) updateFields.due = due;
    if (status !== undefined) updateFields.status = status;

    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ message: "Không có trường nào để cập nhật!!!" });
    }

    const updatedFee = await Fee.findByIdAndUpdate(id, updateFields, { new: true });

    // Xử lý logic trạng thái "Bắt buộc" và "Không bắt buộc"
    if (status !== undefined && status !== existingFee.status) {
      if (status === "Bắt buộc") {
        // Chuyển từ "Không bắt buộc" sang "Bắt buộc"
        const allHouseholds = await Household.find({}, "_id");
        const existingPayments = await Payment.find({ fee_id: id }, "household_id");

        const existingHouseholdIds = existingPayments.map((payment) => payment.household_id.toString());
        const missingPayments = allHouseholds.filter(
          (household) => !existingHouseholdIds.includes(household._id.toString())
        );
        const newPayments = missingPayments.map((household) => ({
          fee_id: id,
          household_id: household._id,
          amount: updatedFee.amount,
          payment_date: updatedFee.due,
          status: "Chưa thanh toán",
        }));

        if (newPayments.length > 0) {
          await Payment.insertMany(newPayments);
        }
      } else if (status === "Không bắt buộc" && households) {
        // Chuyển từ "Bắt buộc" sang "Không bắt buộc"
        const householdIdsToKeep = households.map((householdId) => householdId.toString());
        // Xóa các payment không nằm trong danh sách households được gửi
        await Payment.deleteMany({
          fee_id: id,
          household_id: { $nin: householdIdsToKeep },
        });
      }
    }
    if (amount !== undefined && amount !== existingFee.amount) {
      await Payment.updateMany(
        { fee_id: id },
        { $set: { amount: amount } }
      );
    }

    res.status(200).json({ message: "Cập nhật thành công!", data: updatedFee });
  } catch (error) {
    console.error("Lỗi khi cập nhật:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật!", error });
  }
};

//[POST] /payments/api/v1/delete
module.exports.deleteFee = async (req,res) => {
  try {
    const { id } = req.body;
    await Payment.deleteMany({ fee_id: id });
    await Fee.deleteOne(
      {
        _id:id
      });

    res.status(201).json({message: "Delete Fee Success"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Delete Fee Error", error });
  }
};
