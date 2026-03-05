
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const  register = async (req, res, next) =>{
     try {
    const { name, email, password, phone } = req.body;
    if (!email) {
      console.log("Email is requried");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists");
    }
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({ name, email, password: hash, phone });
    const savedUser = await newUser.save();
    res.status(200).json({
      status: true,
      message: "successfull",
      data: savedUser,
    });
  } catch (err) {
    console.log(err);
  }
}


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      console.log("email is required");
    } else {
      const user = await User.findOne({ email: email });
      if (!user) {
        console.log("invalid email");
      } else {
        const isPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (isPassword) {
          const token = jwt.sign(
            { userId: user._id, userEmail: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRY }
          );

          res.status(200).json({
            status: true,
            message: "successfull",
            data: null,
            result: user,
            access_token: token,
          });
        } else {
          console.log("incorrect password");
        }
      }
    }
  } catch (err) {
    console.log("err");
  }
};