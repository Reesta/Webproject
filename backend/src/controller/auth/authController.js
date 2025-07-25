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
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).send({ message: "Email and password are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    // Find user and check role
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).send({ message: "Access denied. Admin privileges required." });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    // Check if account is locked (optional feature)
    if (user.isLocked) {
      return res.status(403).send({ message: "Account is locked. Please contact support." });
    }

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
 
const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ valid: false, message: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.secretkey);
      const user = await User.findByPk(decoded.id);
      
      if (!user) {
        return res.status(401).json({ valid: false, message: 'User not found' });
      }

      return res.json({ valid: true, user: { id: user.id, email: user.email, role: user.role } });
    } catch (err) {
      return res.status(401).json({ valid: false, message: 'Invalid token' });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(500).json({ valid: false, message: 'Internal server error' });
  }
};

const logout = async (req, res) => {
  try {
    // In a more complex system, you might want to invalidate the token in a blacklist
    // For now, we'll just return success as the frontend will remove the token
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Failed to logout' });
  }
};

export const authController = {
  signup,
  login,
  adminLogin,
  adminSignup,
  init,
  verifyToken,
  logout,
};
 