const express = require("express");
const router = express.Router();
const {
  createFilter,
  listFiltersByCategory,
  updateFilter,
  deleteFilter,
  addFilterOption,
  removeFilterOption,
} = require("../controllers/filter");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

// @endpoint https://clickbuy-api.vercel.app/api/filter
router.post("/filter", authCheck, adminCheck, createFilter); // สร้างตัวกรองใหม่
router.get("/filter/:categoryId", listFiltersByCategory); // ดึงตัวกรองของหมวดหมู่
router.put("/filter/:id", authCheck, adminCheck, updateFilter); // อัปเดตตัวกรอง
router.delete("/filter/:id", authCheck, adminCheck, deleteFilter); // ลบตัวกรอง
router.post("/filter/:filterId/option", authCheck, adminCheck, addFilterOption); // เพิ่มตัวเลือกในตัวกรอง
router.delete("/filter/option/:id", authCheck, adminCheck, removeFilterOption); // ลบตัวเลือกในตัวกรอง

module.exports = router;
