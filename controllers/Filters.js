const prisma = require("../config/prisma");

// เพิ่มตัวกรองในหมวดหมู่
exports.addFilterToCategory = async (req, res) => {
  const { categoryId, name, options } = req.body;
  try {
    const filter = await prisma.filter.create({
      data: {
        name,
        categoryId,
        options: {
          create: options.map((value) => ({ value })),
        },
      },
    });
    res.status(201).json(filter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ดึงตัวกรองของหมวดหมู่
exports.getFiltersByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const filters = await prisma.filter.findMany({
      where: { categoryId: parseInt(categoryId) },
      include: { options: true },
    });
    res.status(200).json(filters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
