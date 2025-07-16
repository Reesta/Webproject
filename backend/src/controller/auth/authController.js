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
      role: 'user'
    });
 
    if (!user)
      return res.status(500).send({ message: "Failed to create user" });

    const userData = { ...user.toJSON() };
    delete userData.password;

 
    res.status(201).send({
       data: {
        user:userData,
        },
         message: "successfully created user"
         });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({ message: "Credentials are required" });
    }

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(500).send({ message: "User not found" });
    }

   
    console.log("User found:", user.toJSON()); 
    console.log("User role:", user.role);     
   
    if (user.role === 'admin') {
      console.log("Attempted login by admin through user endpoint. Blocking.");
      return res.status(403).send({ message: "Admin users cannot log in through this endpoint." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Invalid password for user:", user.email); 
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = generateToken({ user: user.toJSON() });

    const userData = { ...user.toJSON() };
    delete userData.password;

    console.log("User successfully logged in:", userData.email); 
    return res.status(200).send({
      data: {
        user: userData,
        access_token: token,
        isAdmin: false 
      },
      message: "Successfully logged in",
    });
  } catch (e) {
    console.log("Error during login:", e); 
    res.status(500).json({ error: "Failed to login" });
  }
};

const adminLogin = async (req, res) => {
  
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({ message: "Credentials are required" });
    }

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || user.role !== 'admin') {
      return res.status(401).send({ message: "Invalid credentials or not an admin" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).send({ message: "Invalid credentials" });

    const userData = { ...user.toJSON() };
    delete userData.password;

    const token = generateToken(userData); 

    return res.status(200).send({
      data: { 
        user: userData,
        access_token: token 
      },
      message: "Admin successfully logged in",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to login" });
  }
};

const adminSignup = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation for admin
    if (!email || !password)
      return res.status(500).send({ message: "Email and password are required" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).send({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user with only required fields
    const user = await User.create({
      email,
      firstName: "Admin",
      lastName: "Account",
      password: hashedPassword,
      role: 'admin'
    });

    if (!user)
      return res.status(500).send({ message: "Failed to create admin" });

    const token = generateToken({ user: user.toJSON() });
    
    const userData = { ...user.toJSON() };
    delete userData.password;

    res.status(201).send({ 
      data: { user: userData, access_token: token }, 
      message: "Successfully created admin" 
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Failed to create admin" });
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
  adminLogin,
  adminSignup,
  init,
};
 