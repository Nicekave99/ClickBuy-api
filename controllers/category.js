const prisma = require("../config/prisma");

// สร้าง Category พร้อม Filters
exports.create = async (req, res) => {
  try {
    const { name, filters } = req.body; // filters: ["Filter1", "Filter2"]
    const category = await prisma.category.create({
      data: {
        name,
        filters: {
          create: filters.map((filterName) => ({ name: filterName })),
        },
      },
      include: {
        filters: true, // ดึง Filters มาด้วย
      },
    });
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ดึง Categories ทั้งหมด พร้อม Filters
exports.list = async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        filters: true, // ดึง Filters มาด้วย
      },
    });
    res.send(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// อัปเดต Category และ Filters
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, filters } = req.body;

    // อัปเดต Category
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        filters: {
          deleteMany: {}, // ลบ Filters เก่า
          create: filters.map((filterName) => ({ name: filterName })), // สร้าง Filters ใหม่
        },
      },
      include: {
        filters: true, // ดึง Filters มาด้วย
      },
    });

    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ลบ Category พร้อม Filters
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
      },
      include: {
        filters: true, // ลบพร้อม Filters
      },
    });
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ดึง Filters ตาม Category
exports.getFilters = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const filters = await prisma.filter.findMany({
      where: { categoryId: Number(categoryId) },
    });
    res.send(filters);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
