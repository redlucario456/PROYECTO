
require('dotenv').config(); // en Railway no es necesario, pero no estorba si no lo duplicas
const { Sequelize } = require('sequelize');

// Toma primero las variables de Railway; si no existen, usa las locales
const DB_NAME = process.env.MYSQLDATABASE || process.env.DB_NAME;
const DB_USER = process.env.MYSQLUSER     || process.env.DB_USER;
const DB_PASS = process.env.MYSQLPASSWORD || process.env.DB_PASS;
const DB_HOST = process.env.MYSQLHOST     || process.env.DB_HOST || '127.0.0.1';
const DB_PORT = Number(process.env.MYSQLPORT || process.env.DB_PORT || 3306);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
  // Si tu instancia exige SSL (normalmente Railway no lo requiere):
  // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

module.exports = sequelize;
