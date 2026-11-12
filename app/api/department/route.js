
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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
    const departmentsRaw = await prisma.$queryRaw`
      SELECT
        d.id,
        d.name,
        d.code,
        d.description,
        d.status,
        COUNT(e.id) AS employeeCount
      FROM departments d
      LEFT JOIN employees e
        ON d.id = e.departmentId
      GROUP BY
        d.id,
        d.name,
        d.code,
        d.description,
        d.status
      ORDER BY d.id ASC
    `;

   const departments = departmentsRaw.map((dept) => ({ // ✅ Fixed: Correct arrow function syntax =>
      ...dept,
      employeeCount: Number(dept.employeeCount || 0),
    }));
        const totalDepartments = departmentCheck.length;

      const activeTeams = departments.filter(
        (department) => department.status === "Active"
      ).length

    const assignedResult = await prisma.$queryRaw`
      SELECT COUNT(*) AS total
      FROM employees
      WHERE departmentId IS NOT NULL
    `;

    const employeesAssigned = Number(assignedResult[0].total || 0);

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
    console.Error("Department API error:", error);

    return NextResponse.json(
      { message: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}
