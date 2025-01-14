const express = require("express");
const router = express.Router();
const {
  create,
  list,
  remove,
  update,
  getFilters, // เพิ่มฟังก์ชัน getFilters
} = require("../controllers/category");
const { authCheck, adminCheck } = require("../middlewares/authCheck");

// @endpoint https://clickbuy-api.vercel.app/api/category
router.post("/category", authCheck, adminCheck, create); // เพิ่ม Category พร้อม Filters
router.get("/category", list); // ดึง Categories ทั้งหมดพร้อม Filters
router.get("/category/:categoryId/filters", getFilters); // ดึง Filters ตาม Category
router.delete("/category/:id", authCheck, adminCheck, remove); // ลบ Category พร้อม Filters
router.put("/category/:id", authCheck, adminCheck, update); // อัปเดต Category และ Filters

module.exports = router;
