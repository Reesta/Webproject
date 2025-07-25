import { sequelize } from "../config/database.js";
import '../models/association.js';
import { seedAdmin } from './seeders/adminSeeder.js';

export const db = async () => {
  try {
    await sequelize.sync({alter:true});
    console.log("database connected successfully");
    
    // Seed admin user
    await seedAdmin();

  } catch (e) {
    console.error("fail to connect database successfully", e)
  }
}

