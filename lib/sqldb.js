import mysql from "mysql2/promise";
import "server-only"


const pool = mysql.createPool({
  host:  "127.0.0.1",
  port: 3306,
  user: "employee_app",
  password: "ashwani123",
  database: "employees_db",

});

export default pool;