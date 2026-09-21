import { Sequelize } from "sequelize";
import { successResponse } from "../utils/response.js";
export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    pool: {
      min: 2,
      max: 10,
    },
    logging: false,
  },
);

export const check_db = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");
  } catch (error) {
    throw new Error("unable to connect");
  }
};
