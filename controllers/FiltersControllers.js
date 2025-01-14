const prisma = require("../config/prisma");

// สร้างตัวกรองใหม่ในหมวดหมู่
exports.createFilter = async (req, res) => {
  const { name, categoryId, options } = req.body;
  try {
    console.log("Request Body:", req.body); // ตรวจสอบข้อมูลที่ได้รับ
    const filter = await prisma.filter.create({
      data: {
        name,
        categoryId: parseInt(categoryId), // ตรวจสอบว่า categoryId ถูกส่งมาในรูปแบบที่ถูกต้อง
        options: {
          create: options.map((value) => ({ value })), // สร้างตัวเลือก (Filter Options)
        },
      },
      include: { options: true },
    });
    res.status(201).json(filter);
  } catch (error) {
    console.error("Error creating filter:", error); // พิมพ์ข้อผิดพลาดเพื่อช่วยวิเคราะห์
    res.status(500).json({ error: "Failed to create filter" });
  }
};

// ดึงตัวกรองทั้งหมดในหมวดหมู่
exports.getFiltersByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const filters = await prisma.filter.findMany({
      where: { categoryId: parseInt(categoryId) },
      include: { options: true },
    });
    res.status(200).json(filters);
  } catch (error) {
    console.error("Error fetching filters:", error);
    res.status(500).json({ error: "Failed to fetch filters" });
  }
};

// อัปเดตตัวกรอง
exports.updateFilter = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedFilter = await prisma.filter.update({
      where: { id: parseInt(id) },
      data: { name },
    });
    res.status(200).json(updatedFilter);
  } catch (error) {
    console.error("Error updating filter:", error);
    res.status(500).json({ error: "Failed to update filter" });
  }
};

// ลบตัวกรอง
exports.deleteFilter = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.filter.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting filter:", error);
    res.status(500).json({ error: "Failed to delete filter" });
  }
};

// เพิ่มตัวเลือกในตัวกรอง
exports.addFilterOption = async (req, res) => {
  const { filterId } = req.params;
  const { value } = req.body;
  try {
    const option = await prisma.filterOption.create({
      data: {
        value,
        filterId: parseInt(filterId),
      },
    });
    res.status(201).json(option);
  } catch (error) {
    console.error("Error adding filter option:", error);
    res.status(500).json({ error: "Failed to add filter option" });
  }
};

// ลบตัวเลือกในตัวกรอง
exports.removeFilterOption = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.filterOption.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting filter option:", error);
    res.status(500).json({ error: "Failed to delete filter option" });
  }
};
