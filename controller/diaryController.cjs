const authModel = require("../models/authSchema.cjs");
const diaryModel = require("../models/diarySchema.cjs");

const getdiaryById = async (req, res) => {
  const { id } = req.params;
  try {
    const diary = await diaryModel.findById(id);
    if (diary) {
      return res.status(200).send(diary);
    } else {
      return res.status(404).send({ message: "No diary entry found" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const postdiary = async (req, res) => {
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
    const diary = await diaryModel.create({ title, description, createdBy });
    return res.status(201).send(diary);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const updatediary = async (req, res) => {
  const { id } = req.params;
  const diaryEntry = diaryModel.findOne(id);
  if (!diaryEntry) {
    return res.status(404).send({ message: "No such diary entry exists" });
  }
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .send({ message: "Title and Description are required fields" });
  }
  try {
    const diary = await diaryModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true, runValidators: true }
    );
    if (diary) {
      return res.status(200).send(diary);
    } else {
      return res.status(404).send({ message: "Failed to update diary Entry" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const deletediary = async (req, res) => {
  const { id } = req.params;
  const diaryEntry = diaryModel.findOne(id);
  if (!diaryEntry) {
    return res.status(404).send({ message: "No such diary entry exists" });
  }
  try {
    const diary = await diaryModel.findByIdAndDelete(id);
    if (diary) {
      return res.status(200).send({ message: "diary Entry Deleted" });
    } else {
      return res.status(404).send({ message: "Failed to delete diary Entry" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getAllDiary = async (req, res) => {
  const id = req.id;
  try {
    const userExists = await authModel.findOne({ _id: id });
    if (!userExists) {
      return res.status(404).send({ message: "No User found" });
    }
    const diary = await diaryModel.find({ createdBy: id });
    if (diary.length > 0) {
      return res.status(200).send(diary);
    } else {
      return res
        .status(404)
        .send({ message: "No diary Entry has been found for this user" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = {
  getAllDiary,
  getdiaryById,
  postdiary,
  updatediary,
  deletediary,
};
