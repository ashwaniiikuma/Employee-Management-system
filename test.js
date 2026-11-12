import { prismaClient } from "@prisma/client";

const prisma = new prismaClient();

async function main(){
    try{
        //first department 
        const dept = await prisma.department.create({
            data: {
                id: "id",
                name: "Development",
                code: "dev",
                description: "Devlop and making websites",
                status: "Active"
            }
        });
        console.log("Department Created:", dept);

        //Employee link in departmentId
        const emp = await prisma.employee.create({
            data:{
                id:"id",
                name:"Shubham",
                email: "shubham@gmail.com",
                salary: 28000,
                departmentId:dept.id
            }
        });
        console.log("Employee Created: ", emp);    
    }catch (err){
        console.err("Error", err);
    }finally{
        await prisma.$disconnect();
    }
}

main();


