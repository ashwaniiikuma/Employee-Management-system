import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function GET() {
    
    try{
        const statsRaw = await prisma.$queryRaw
            ` 
            SELECT
            (SELECT COUNT(*) FROM employees) AS totalEmployees,

            (SELECT COUNT(*) FROM departments) AS totalDepartments,

            (SELECT COALESCE(SUM(salary), 0) 
            FROM employees) AS monthlyPayroll,

            (SELECT COALESCE(AVG(salary),0)
            FROM employees) AS averageSalary
            `
        ;

        const stats = statsRaw[0] || {};

        //Recent employees
        const recentEmployees = await prisma.$queryRaw`
            SELECT
            e.id,
            e.name,
            e.email,
            d.name AS department,
            e.salary
            FROM employees e
            LEFT JOIN departments d
                ON e.departmentId = d.id
                ORDER BY e.id DESC
                LIMIT 5
            `;

            return NextResponse.json(
                {
                    statistics:{
                        totalEmployees: Number(stats.totalEmployees || 0),
                        totalDepartments: Number(stats.totalDepartments || 0),
                        monthlyPayroll: Number(stats.monthlyPayroll || 0),
                        averageSalary: Number(stats. averageSalary || 0),
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