import { Sequelize } from 'sequelize';

// Replace the following values with your actual database configuration
const sequelize = new Sequelize('postgres', 'postgres', 'root', {
  host: 'localhost', // or your database host
  dialect: 'mysql', // or your database dialect (e.g., 'postgres', 'sqlite', 'mariadb', 'mssql')
  logging: false,
});

export { sequelize };
