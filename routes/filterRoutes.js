const express = require("express");
const router = express.Router();
const {
  create,
  list,
  update,
  remove,
  addOption,
  removeOption,
} = require("../controllers/FiltersControllers");

// @endpoint https://clickbuy-api.vercel.app/api/filters
router.post("/filters", create); // สร้างตัวกรองใหม่
router.get("/filters/:categoryId", list); // ดึงตัวกรองทั้งหมดในหมวดหมู่
router.put("/filters/:id", update); // อัปเดตตัวกรอง
router.delete("/filters/:id", remove); // ลบตัวกรอง
router.post("/filters/:filterId/option", addOption); // เพิ่มตัวเลือกในตัวกรอง
router.delete("/filters/option/:id", removeOption); // ลบตัวเลือกในตัวกรอง

module.exports = router;
