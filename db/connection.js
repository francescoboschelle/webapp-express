import "dotenv/config";
import mysql from "mysql2";

const credentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSW,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
};

const connection = mysql.createConnection(credentials);

connection.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

export default connection;
