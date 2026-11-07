
import { NextResponse } from "next/server";
import pool from "@/lib/sqldb";

export async function POST(request) {
  try {
    // Frontend se aane wala data read karna
    const body = await request.json();
    const { name, email, department, departmentId, salary } = body;

    // SQL query execute karna
    const [result] = await pool.execute(
      `INSERT INTO employees (name, email, department, department_id, salary)
       VALUES (?, ?, ?, ?)`,
      [name, email, department, departmentId, salary]
    );

    return NextResponse.json(
      {
        message: "Employee added successfully",
        employeeId: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error.message);

    return NextResponse.json(
      { message: "Failed to add employee" },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
        const [rows] = await pool.execute(`

            SELECT 
                e.id,
                e.name,
                e.email,
                e.department_id,
                d.name AS department,
                e.salary
            FROM employees e
            LEFT JOIN departments d
               ON e.department_id = d.id
            ORDER BY e.id DESC

        `);

        return NextResponse.json(rows,{status: 200});
        
    } catch (error) {
        console.error("Fetch employees error:", error);

        return NextResponse.json(
            { message: "Failed to fetch employees" },
            { status: 500 }
        );
    }
}