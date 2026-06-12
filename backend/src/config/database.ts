import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  logging: false,
});
export default sequelize;