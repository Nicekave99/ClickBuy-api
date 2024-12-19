const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    // Validate Body
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email is required!!" });
    }
    if (!password) {
      return res.status(400).json({ message: "password is required!!!" });
    }

    // Check Email in DB already ?
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Register
    await prisma.user.create({
      data: {
        email: email,
        password: hashPassword,
      },
    });

    res.send("Register Success");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1 Check Email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!user || !user.enabled) {
      return res
        .status(400)
        .json({ message: "บัญชีผู้ใช้งานนี้ถูกปิดใช้งานอยู่" });
    }
    // Step 2 Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "ไม่อีเมล ก็ รหัสผ่านผิด อะเช็คดีๆสู" });
    }
    // Step 3 Create Payload
    const Payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    // Step 4 Generate Token
    jwt.sign(Payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: "oops something went wrong" });
      }

      res.json({ Payload, token });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "something went wrong" });
  }
};

exports.currentUser = async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: req.user.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
};
