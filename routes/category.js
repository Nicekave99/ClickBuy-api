const express = require("express");
const router = express.Router();
const {
  create,
  list,
  remove,
  update,
  addFilter,
  removeFilter,
} = require("../controllers/category");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

// @endpoint https://clickbuy-api.vercel.app/api/category
router.post("/category", authCheck, adminCheck, create);
router.get("/category", list);
router.delete("/category/:id", authCheck, adminCheck, remove);
router.put("/category/:id", authCheck, adminCheck, update);
router.post("/filter", authCheck, adminCheck, addFilter);
router.delete("/filter/:id", authCheck, adminCheck, removeFilter);

module.exports = router;
