const express = require("express");
const router = express.Router();
const {
  getFilters,
  createFilter,
  updateFilter,
  deleteFilter,
} = require("../controllers/Filters");

router.get("/", getFilters);
router.post("/", createFilter);
router.put("/:id", updateFilter);
router.delete("/:id", deleteFilter);

module.exports = router;
