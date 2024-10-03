const express = require("express");
const router = express.Router();
const {
  getAllDiary,
  postdiary,
  updatediary,
  deletediary,
  getdiaryById,
} = require("../controller/diaryController.cjs");

router.get("/", getAllDiary);
router.get("/:id", getdiaryById);
router.post("/", postdiary);
router.put("/:id", updatediary);
router.delete("/:id", deletediary);

module.exports = router;
