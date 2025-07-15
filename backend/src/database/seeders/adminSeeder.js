import { User } from "../../models/user/User.js";
import bcrypt from "bcrypt";

export const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({
      where: {
        email: "admin@caffio.com",
        role: "admin",
      },
    });

    if (existingAdmin) {
      console.log("Admin account already exists, skipping creation.");
      return;
    }
    
    // Create default admin if it doesn't exist
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@caffio.com",
      password: hashedPassword,
      role: "admin",
    });
    console.log("Default admin account created");
  } catch (error) {
    console.error("Error seeding admin:", error);
  }
};

seedAdmin();