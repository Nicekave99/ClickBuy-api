const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await prisma.category.create({
      data: {
        name: name,
      },
    });
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.list = async (req, res) => {
  try {
    const category = await prisma.category.findMany();
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await prisma.category.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
      },
    });
    res.send(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await prisma.category.delete({
      where: {
        id: Number(id),
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

exports.addFilter = async (req, res) => {
  try {
    const { categoryId, name } = req.body;
    const filter = await prisma.filter.create({
      data: { name, categoryId: parseInt(categoryId) },
    });
    res.status(200).json(filter);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.removeFilter = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.filter.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Filter removed successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
