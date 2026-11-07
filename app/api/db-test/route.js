import pool from "@/lib/sqldb";

import { NextResponse } from "next/server";

export async function GET(){
    try{
        const [rows] = await pool.query("SELECT 1 AS connected")
    
    return NextResponse.json({
        success: true,
        message: "MySQL is connected successfully!",
        data: rows,
    });
    }catch(error){
        console.error("MySQL connection error: ", error.message);

        return NextResponse.json({
            success: false,
            message: "Database connection failed"},
        {status:500}
        );
    }
}