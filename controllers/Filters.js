const prisma = require("../config/prisma");

// ดึงรายการ Filters ทั้งหมด
export const getFilters = async (req, res) => {
  try {
    const filters = await prisma.filter.findMany({
      include: { category: true },
    });
    res.status(200).json(filters);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch filters" });
  }
};

// สร้าง Filter ใหม่
export const createFilter = async (req, res) => {
  const { name, type, categoryId } = req.body;
  try {
    const filter = await prisma.filter.create({
      data: { name, type, categoryId },
    });
    res.status(201).json(filter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create filter" });
  }
};

// อัปเดต Filter
export const updateFilter = async (req, res) => {
  const { id } = req.params;
  const { name, type, categoryId } = req.body;
  try {
    const filter = await prisma.filter.update({
      where: { id: Number(id) },
      data: { name, type, categoryId },
    });
    res.status(200).json(filter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update filter" });
  }
};

// ลบ Filter
export const deleteFilter = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.filter.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete filter" });
  }
};
