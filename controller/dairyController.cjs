const authModel = require("../models/authSchema.cjs");
const dairyModel = require("../models/dairySchema.cjs");

const getDairy = async (req, res) => {
  try {
    const dairy = await dairyModel.find();
    if (dairy) {
      return res.status(200).send(dairy);
    } else {
      return res.status(404).send({ message: "No dairy entry found" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getDairyById = async (req, res) => {
  const { id } = req.params;
  try {
    const dairy = await dairyModel.findById(id);
    if (dairy) {
      return res.status(200).send(dairy);
    } else {
      return res.status(404).send({ message: "No dairy entry found" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const postDairy = async (req, res) => {
  const { title, description, createdBy } = req.body;
  if (!title || !description || !createdBy) {
    return res
      .status(400)
      .send({ message: "Title, Description, and Creator are required fields" });
  }
  const user = authModel.findOne(`${createdBy}`);
  if (!user) {
    return res.status(404).send({ message: "Not a valid User" });
  }
  try {
    const dairy = await dairyModel.create({ title, description, createdBy });
    return res.status(201).send(dairy);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updateDairy = async (req, res) => {
  const { id } = req.params;
  const dairyEntry = dairyModel.findOne(id);
  if (!dairyEntry) {
    return res.status(404).send({ message: "No such dairy entry exists" });
  }
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .send({ message: "Title and Description are required fields" });
  }
  try {
    const dairy = await dairyModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (dairy) {
      return res.status(200).send(dairy);
    } else {
      return res.status(404).send({ message: "Failed to update Dairy Entry" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deleteDairy = async (req, res) => {
  const { id } = req.params;
  const dairyEntry = dairyModel.findOne(id);
  if (!dairyEntry) {
    return res.status(404).send({ message: "No such dairy entry exists" });
  }
  try {
    const dairy = await dairyModel.findByIdAndDelete(id);
    if (dairy) {
      return res.status(200).send({ message: "Dairy Entry Deleted" });
    } else {
      return res.status(404).send({ message: "Failed to delete Dairy Entry" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getDairyByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const userExists = await authModel.findOne({ _id: id });
    if (!userExists) {
      return res.status(404).send({ message: "No User found" });
    }
    const dairy = await dairyModel.find({ createdBy: id });
    if (dairy.length > 0) {
      return res.status(200).send(dairy);
    } else {
      return res.status(404).send({ message: "No Dairy Entry has been found for this user" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getDairy,
  getDairyById,
  postDairy,
  updateDairy,
  deleteDairy,
  getDairyByUser,
};
