import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//GET : Fetch one employee by ID
export async function GET(request, {params}){
    try{
        const {id} = await params;

      const employee = await prisma.employee.findUnique({
        where: {id: String(id)},
      });

      if(!employee){
        return NextResponse.json(
            {message: "Employee not found"},
            {status: 404},
        );
      }

        return NextResponse.json(employee, {status: 200});
    }catch(error){
        console.error("Fetch employee error:", error);
        return NextResponse.json(
            {message: "Failed to fetch employee"},
            {status:500}
        );
    }
} 


    //Update employee by ID
export async function PUT(request, {params}){
    try{
        const {id} = await params;

        const {name, email, department, salary} = await request.json();

        if(
            !name?.trim()|| 
            !email?.trim()||
            !department?.trim()||
            salary === ""||
            salary === null ||
            salary === undefined||
            !Number.isFinite(Number(salary)) ||
            Number(salary)< 0
        ){
            return NextResponse.json(
                {message: "Please provide valid employee details"},
                {status: 400}
            );
        }

        const existing = await prisma.employee.findUnique({
           where: {id: String(id)},
        });

        if(!existing){
            return NextResponse.json(
                {message: "Emplooyee not found"},
                {status: 404}
            );
        }

           const updatedEmployee = await prisma.employee.update({
            where: {id: String(id) },
            data:{
                name: name.trim(),
                email: email.trim(),
                department: department.trim(),
                salary: Number(salary),
            },
           });

            return NextResponse.json(
                {message: "Employee updated Successfully", employee: updatedEmployee},
                {status: 200}
            );

    }catch (error){
        console.error("Update employee error:", error);

        if(error.code === "P2002"){
            return NextResponse.json(
                {message: "This email is already registered"},
                {status: 409}
            );
        }

        return NextResponse.json(
            {message: "Failed to update employee"},
            {status:500}
        );
    }
}

export async function DELETE(request, {params}){
    try{
        const {id} = await params;

        try{
            await prisma.employee.delete({
                where: {id: String(id)},
            });
        }catch (prismaError) {
            if(prismaError.code === "p2025"){
                return NextResponse.json(
                    {message: "Employee not found"},
                    {status: 404}
                );
            }
            throw prismaError;
        }
        return NextResponse.json(
            {message: "Employee is deleted successfully"},
            {status: 200}
        );
    }catch (error){
        console.error("Delete employee error:", error);
        return NextResponse.json(
            {message: "Failed to delete employee error"},
            {status: 500}
        );
    }
}