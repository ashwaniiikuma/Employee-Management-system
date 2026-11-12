
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request) {
  try {
    // Frontend se aane wala data read karna
    const body = await request.json();
    const { name, email, department, departmentId, salary } = body;

    console.log("departmentId:", departmentId)
    // Prisma query  se employee create karna
    const newEmployee = await prisma.employee.create({
      data: {
        name, email, department,
         departmentId: departmentId ?Number(departmentId) : null,
        salary:parseFloat(salary),
        
      },
    });
   

    return NextResponse.json(
      {
        message: "Employee added successfully",
        employeeId: newEmployee.id,
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
        const employees = await prisma.employee.findMany({

        include: {
          department: true,
        },

        });

        return NextResponse.json(employees,{status: 200});
        
    } catch (error) {
        console.error("Fetch employees error:", error);

        return NextResponse.json(
            { message: "Failed to fetch employees" },
            { status: 500 }
        );
    }
}