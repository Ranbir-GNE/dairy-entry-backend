const express = require("express");
const router = express.Router();
const {
  getDairy,
  postDairy,
  updateDairy,
  deleteDairy,
  getDairyById,
  getDairyByUser,
} = require("../controller/dairyController.cjs");

router.get("/", getDairy);
router.get("/get-dairy/:id", getDairyById);
router.get("/get-dairy-by-user-id/:id", getDairyByUser);
router.post("/create", postDairy);
router.put("/update-dairy/:id", updateDairy);
router.delete("/delete/:id", deleteDairy);

module.exports = router;
