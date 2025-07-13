import { User } from "../../models/index.js";
import { generateToken } from "../../security/jwt-util.js";
import bcrypt from "bcrypt";
 
const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    //validation
    if (!firstName || !lastName || !email || !password)
      return res.status(500).send({ message: "Invalid paylod" });
 
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).send({ message: "User already exists" });
 
    const hashedPassword = await bcrypt.hash(password, 10);
 
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
 
    if (!user)
      return res.status(500).send({ message: "Failed to create user" });
 
    res.status(201).send({ data: user, message: "successfully created user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //fetching all the data from users table
    if (!email || !password) {
      return res.status(500).send({ message: "Credential is required" });
    }
 
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(500).send({ message: "user not found" });
    }
 
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid credentials" });
 
    const token = generateToken({ user: user.toJSON() });
    return res.status(200).send({
      data: { access_token: token },
      message: "successfully logged in",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to login" });
  }
};
 
/**
 *  init
 */
 
const init = async (req, res) => {
  try {
    const user = req.user.user;
    delete user.password;
    res
      .status(201)
      .send({ data: user, message: "successfully fetched current  user" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
 
export const authController = {
  signup,
  login,
  init,
};
 