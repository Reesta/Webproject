import { sequelize } from "./sequelize.js";
import { User } from '../models/user/User.js';
// import { seedAdmin } from './seeders/adminSeeder.js';

export const db = async () => {
  try {
    await sequelize.sync({alter:true});
    console.log("database connected successfully");
    
    // Seed the default admin account
    // await seedAdmin();

  } catch (e) {
    console.error("fail to connect database successfully",)
  }
}
