
import User from '../models/user.js'
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