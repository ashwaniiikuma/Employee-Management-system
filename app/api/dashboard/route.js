import pool from "@/lib/sqldb";
import { NextResponse } from "next/server";
export async function GET() {
    
    try{
        const [stats] = await pool.execute(
            ` 
            SELECT
            (SELECT COUNT(*) FROM employees) AS totalEmployees,

            (SELECT COUNT(*) FROM departments) AS totalDepartments,

            (SELECT COALESCE(SUM(salary), 0) 
            FROM employees) AS monthlyPayroll,

            (SELECT COALESCE(AVG(salary),0)
            FROM employees) AS averageSalary
            `
        );

        //Recent employees
        const [recentEmployees] = await pool.execute(`
            SELECT
            e.id,
            e.name,
            e.email,
            d.name AS department,
            e.salary
            FROM employees e
            LEFT JOIN departments d
                ON e.department_id = d.id
                ORDER BY e.id DESC
                LIMIT 5
            `)

            return NextResponse.json(
                {
                    statistics:{
                        totalEmployees: Number(stats[0].totalEmployees),
                        totalDepartments: Number(stats[0].totalDepartments),
                        monthlyPayroll: Number(stats[0].monthlyPayroll),
                        averageSalary: Number(stats[0]. averageSalary),
                    },
                    recentEmployees,
                },
                {status: 200}
            );
    }catch (error){
        console.log("Dashboard PI Error:", error);


        return NextResponse.json(
            {message: "Failed to fetch dashbaord data"},
            {status: 500}
        );
    }
}