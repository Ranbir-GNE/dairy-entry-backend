const express = require("express");
const router = express.Router();
const {
  getdiary,
  postdiary,
  updatediary,
  deletediary,
  getdiaryById,
  getdiaryByUser,
} = require("../controller/diaryController.cjs");

router.get("/", getdiary);
router.get("/:id", getdiaryById);
router.get("/fetch/:id", getdiaryByUser);
router.post("/", postdiary);
router.put("/:id", updatediary);
router.delete("/:id", deletediary);

module.exports = router;
