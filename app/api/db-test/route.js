import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{
        const rows = await prisma.$queryRaw("SELECT 1 AS connected")
    
    return NextResponse.json({
        success: true,
        message: "Aiven Cloud MySQL is connected successfully via Prisma!",
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