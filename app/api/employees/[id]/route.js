import { NextResponse } from "next/server";
import pool from "@/lib/sqldb";

//GET : Fetch one employee by ID
export async function GET(request, {params}){
    try{
        const {id} = await params;

        if(!/^\d+$/.test(id) || Number(id)< 1){
            return NextResponse.json(
                {message: "Invalid employee ID"},
                {status: 400}
            );
        }

        const [rows] = await pool.execute(
            "SELECT * FROM employees WHERE id = ?",
            [Number(id)]
        );

        if(rows.length === 0){
            return NextResponse.json(
                {message: "Employee not found"},
                {status: 404}
            );
        }
        return NextResponse.json(rows[0], {status: 200});
    }catch(error){
        console.error("Fetch employee error:", error);
        return NextResponse.json(
            {message: "Failed to fetch employee"},
            {status:500}
        );
    }
} 

export async function PUT(request, {params}){
    try{
        const {id} = await params;

        if(!/^\d+$/.test(id) || Number(id)< 1){
            return NextResponse.json(
                {message: "Invalid Employee ID"},
                {status: 400}
            );
        }

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

        const[existing] = await pool.execute(
            "SELECT id FROM emolpyees WHERE id = ?",
            [Number(id)]
        );
        if(existing.length === 0){
            return NextResponse.json(
                {message: "Emplooyee not found"},
                {status: 404}
            );
        }

            await pool.execute(
            `UPDATE employees
            SET name = ?, email = ?, department = ?, salary = ?
            WHERE id = ?`,
            [
                name.trim(),
                email.trim(),
                department.trim(),
                Number(salary),
                Number(id),
             ]
            );

            return NextResponse.json(
                {message: "Employee updated Successfully"},
                {status: 200}
            );

    }catch (error){
        console.error("Update employee error:", error);

        if(error.code === "ER_DUP_ENTRY"){
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

        if(/^\d+$/.test(id) || Number(id)<1){
            return NextResponse.json(
                {message: "Invalid employee ID"},
                {status: 400}
            );
        }

        const [result] = await pool.execute(
            "DELETE FROM employees WHERE id = ?",
            [Number(id)]
        );

        if(result.affectedRows === 0){
            return NextResponse.json(
                {message: "Employees is not found"},
                {status: 404}
            );
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