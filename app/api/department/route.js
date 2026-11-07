
import { NextResponse } from "next/server";
import pool from "@/lib/sqldb";

export async function GET() {
  try {

    const [dbInfo] = await pool.execute(`
  SELECT DATABASE() AS dbName
`);

const [departmentCheck] = await pool.execute(`
  SELECT * FROM departments
`);

console.log("Connected Database:", dbInfo);
console.log("Departments Found:", departmentCheck);

    // Fetch departments with employee counts
    const [departments] = await pool.execute(`
      SELECT
        d.id,
        d.name,
        d.code,
        d.description,
        d.status,
        COUNT(e.id) AS employeeCount
      FROM departments d
      LEFT JOIN employees e
        ON d.id = e.department_id
      GROUP BY
        d.id,
        d.name,
        d.code,
        d.description,
        d.status
      ORDER BY d.id ASC
    `);

    // Calculate department statistics
    const totalDepartments = departments.length;

    const activeTeams = departments.filter(
      (department) => department.status === "Active"
    ).length;

    const [assignedResult] = await pool.execute(`
      SELECT COUNT(*) AS total
      FROM employees
      WHERE department_id IS NOT NULL
    `);

    const employeesAssigned = Number(assignedResult[0].total);

    return NextResponse.json(
      {
        statistics: {
          totalDepartments,
          activeTeams,
          employeesAssigned,
        },
        departments,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Department API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}
