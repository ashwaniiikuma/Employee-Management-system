"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

const departmentColors = {
  Development: "bg-cyan-400/10 text-cyan-300 border border-cyan-400/20",
  design: "bg-purple-400/10 text-purple-300 border border-purple-400/20",
  Testing: "bg-amber-400/10 text-amber-300 border border-amber-400/20",
  Marketing: "bg-pink-400/10 text-pink-300 border border-pink-400/20",
  "Humar resources": "bg-green-400/10 text-green-300 border border-green-400/30",
};


export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [statistics, setStatistics]= useState({
    totalDepartments: 0,
    activeTeams:0,
    employeesAssigned: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(()=>{
    async function fetchDepartments() {
      try{
        const response = await fetch("/api/department");
        const data= await response.json();

        setDepartments(data.departments);
        setStatistics(data.statistics);

        if(!response.ok){
          throw new error(data.message || "Failed to fetch department")
        };
      }catch (error){
        console.error(error.message || "Something went wrong")
      }finally{
        setLoading(false);
      }

    }
  fetchDepartments();
  }, []);



  return (
    <div className="min-h-screen bg-[#111713] text-[#F4F7EE]">
      

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#C7F36B]">
              PEOPLE OPERATIONS / ORGANIZATION
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Departments<span className="text-[#C7F36B]">.</span>
            </h1>
            <p className="mt-3 text-sm text-[#A3AD9E]">
              Organize teams and see how your people are distributed.
            </p>
          </div>

          <Link
            href="/employees/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C7F36B] px-5 py-3 text-sm font-bold text-[#111713] transition hover:bg-[#D8FF8A]"
          >
            <span className="text-lg">+</span>
            Add employee
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#343D34] bg-[#19211B] p-5">
            <p className="text-sm text-[#A3AD9E]">Total departments</p>
            <p className="mt-3 text-3xl font-bold">{statistics.totalDepartments.toString().padStart(2,"0")}</p>
            <p className="mt-2 text-xs text-[#667064]">
              Across the organization
            </p>
          </div>

          <div className="rounded-2xl border border-[#343D34] bg-[#19211B] p-5">
            <p className="text-sm text-[#A3AD9E]">Active teams</p>
            <p className="mt-3 text-3xl font-bold">{statistics.activeTeams.toString().padStart(2, "0")}</p>
            <p className="mt-2 text-xs text-[#667064]">
              Available for assignment
            </p>
          </div>

          <div className="rounded-2xl border border-[#343D34] bg-[#19211B] p-5">
            <p className="text-sm text-[#A3AD9E]">Employees assigned</p>
            <p className="mt-3 text-3xl font-bold">{statistics.employeesAssigned.toString().padStart(2,"0")}</p>
            <p className="mt-2 text-xs text-[#667064]">
              Across all departments
            </p>
          </div>
        </div>

        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-lg font-semibold">Your teams</h2>
            <p className="mt-1 text-sm text-[#A3AD9E]">
              An overview of departments and their current members.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            
            
            
            {loading ? (
              <p className="text-[#a3ad9e]">Loading department...</p>
            ):error ?(
              <p className="text-red-400">{error}</p>
            ):departments.length === 0 ?(
              <p className="text-[#a3ad9e]">No departments found.</p>
            ):(
            
            departments.map((department) => (
              <article
                key={department.id}
                className="rounded-2xl border border-[#343D34] bg-[#19211B] p-5 transition hover:border-[#647450]"
              >
                <div className="flex items-start justify-between gap-3">
   <div
  className={`grid size-12 place-items-center rounded-xl text-sm font-extrabold ${
    departmentColors[department.name] || "bg-gray-400/10 text-gray-300"
  }`}
>
  {department.code}
</div>

                  <span className="rounded-full border border-[#343D34] px-3 py-1 text-xs text-[#A3AD9E]">
                    {department.status}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {department.name}
                </h3>

                <p className="mt-2 min-h-10 text-sm leading-5 text-[#A3AD9E]">
                  {department.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#343D34] pt-4">
                  <span className="text-sm text-[#A3AD9E]">
                    Team members
                  </span>
                  <span className="text-sm font-bold">
                    {Number(department.employeeCount ?? 0).toString().padStart(2, "0")}
                  </span>
                </div>
              </article>
            ))
          )}
          </div>
        </section>
      </main>
    </div>
  );
}
