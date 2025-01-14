const prisma = require("../config/prisma");

// สร้างตัวกรองใหม่
exports.create = async (req, res) => {
  try {
    const { name, options } = req.body;
    const filter = await prisma.filter.create({
      data: {
        name: name,
        options: {
          create: options.map((value) => ({ value })),
        },
      },
      include: { options: true },
    });
    res.send(filter);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ดึงตัวกรองทั้งหมดในหมวดหมู่
exports.list = async (req, res) => {
  try {
    const filters = await prisma.filter.findMany();
    res.send(filters);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// อัปเดตตัวกรอง
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const filter = await prisma.filter.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.send(filter);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ลบตัวกรอง
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = await prisma.filter.delete({
      where: { id: Number(id) },
    });
    res.send(filter);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// เพิ่มตัวเลือกในตัวกรอง
exports.addOption = async (req, res) => {
  try {
    const { filterId } = req.params;
    const { value } = req.body;
    const option = await prisma.filterOption.create({
      data: {
        value,
        filterId: Number(filterId),
      },
    });
    res.send(option);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ลบตัวเลือกในตัวกรอง
exports.removeOption = async (req, res) => {
  try {
    const { id } = req.params;
    const option = await prisma.filterOption.delete({
      where: { id: Number(id) },
    });
    res.send(option);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
