import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!email || !name || !password || !phone) {
      return res.status(400).json({ status: false, message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: false, message: "User already exists" });
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hash, phone });
    const savedUser = await newUser.save();
    res.status(201).json({
      status: true,
      success: true,
      message: "Registration successful",
      data: savedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
}

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ status: false, message: "Invalid email or password" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (isPassword) {
      const token = jwt.sign(
        { userId: user._id, userEmail: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_TOKEN_EXPIRY }
      );

      // Remove password from local user object before sending
      const userObj = user.toObject();
      delete userObj.password;

      res.status(200).json({
        status: true,
        success: true,
        message: "Login successful",
        user: userObj,
        token: token,
        result: userObj,
        access_token: token,
      });
    } else {
      res.status(401).json({ status: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const profileView = async (req, res, next) => {
  try {
    const id = req.query.id || req.body.id;
    if (!id) {
      return res.status(400).json({ status: false, message: "id is required" });
    }
    const userData = await User.findById(id).select("-password");
    if (!userData) {
      return res.status(404).json({ status: false, message: "user not found" });
    } else {
      res.status(200).json({
        status: true,
        success: true,
        message: "user fetched successfully",
        data: userData
      })
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
}