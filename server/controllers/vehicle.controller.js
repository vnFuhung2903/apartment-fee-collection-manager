const Vehicle = require("../models/vehicle.js");
const Household = require("../models/household.js");

//[GET] vehicles/api/v2/vehicles
module.exports.index = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

//[POST] vehicles/api/v2/delete
module.exports.deleteVehicle = async (req, res) => {
  try {
    const { _id, household_id, plate, vehicle_type } = req.body;
    await Vehicle.updateOne(
      { _id, household_id },
      {
        $pull: { vehicle: { plate, vehicle_type } },
      }
    );
    let updateData = {};

    if (type === "Xe máy") {
      updateData = {
        $pull: { motobikes: { plate, vehicle_type } },
      };
    } else if (type === "Ô tô") {
      updateData = {
        $pull: { cars: { plate, vehicle_type } },
      };
    }

    await Household.updateOne({ _id: household_id }, updateData);

    res.status(200).json({ message: "Vehicle deleted successfully" });
    res.status(200).json(vehicleRecord);
  } catch (error) {
    res.status(500).json({ message: "Error deleting vehicle" });
  }
};

//[POST] vehicles/api/v2/create
module.exports.createVehicle = async (req, res) => {
  try {
    const { ownName, vehicle_type, plate, household_id } = req.body;    
    
    let vehicleRecord = await Vehicle.findOne({
      household_id,
    });

    if (!vehicleRecord) {
      vehicleRecord = new Vehicle({
        ownName,
        household_id,
        vehicle: [{ plate, vehicle_type }],
      });
    } else {
      const vehicleRc = await Vehicle.findOne({ "vehicle.plate": plate });
      if (!vehicleRc) {
        vehicleRecord.vehicle.push({ plate, vehicle_type });
      }
    }
    await vehicleRecord.save();

    const updateField = vehicle_type === "Xe máy" ? "motobikes" : "cars";
    await Household.updateOne(
      { _id: household_id },
      { $addToSet: { [updateField]: { vehicle_type, plate } } }
    );
    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
