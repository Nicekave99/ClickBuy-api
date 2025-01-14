const express = require("express");
const router = express.Router();
const {
  createFilter,
  getFiltersByCategory,
  updateFilter,
  deleteFilter,
  addFilterOption,
  removeFilterOption,
} = require("../controllers/FiltersControllers");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

// @endpoint https://clickbuy-api.vercel.app/api/filters
router.post("/filters", authCheck, adminCheck, createFilter); // สร้างตัวกรองใหม่
router.get("/filters/:categoryId", getFiltersByCategory); // ดึงตัวกรองของหมวดหมู่
router.put("/filters/:id", authCheck, adminCheck, updateFilter); // อัปเดตตัวกรอง
router.delete("/filters/:id", authCheck, adminCheck, deleteFilter); // ลบตัวกรอง
router.post(
  "/filters/:filterId/option",
  authCheck,
  adminCheck,
  addFilterOption
); // เพิ่มตัวเลือกในตัวกรอง
router.delete("/filters/option/:id", authCheck, adminCheck, removeFilterOption); // ลบตัวเลือกในตัวกรอง

module.exports = router;
