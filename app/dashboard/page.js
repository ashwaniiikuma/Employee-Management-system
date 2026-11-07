"use client"
import Link from "next/link";
import { useEffect, useState } from "react";


 

const activities = [
  {
    title: "Employee directory created",
    detail: "Employee management workspace initialized",
    time: "Recently",
  },
  {
    title: "Departments configured",
    detail: "Organization teams added to the interface",
    time: "Recently",
  },
  {
    title: "Database connected",
    detail: "MySQL connection successfully tested",
    time: "Recently",
  },
];

export default function DashboardPage() {
  const [statistics, setStatistics] = useState({
    totalEmployees:0,
    totalDepartment:0,
    monthlyPayroll: 0,
    averageSalary: 0,

  });

  const [recentEmployees, setRecentEemployees] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const stats = [
  {
    label: "Total Employees",
    value: statistics.totalEmployees,
    icon: "♙",
    color: "text-[#C7F36B]",
    note: "Registered team members",
  },
  {
    label: "Departments",
    value: statistics.totalDepartments,
    icon: "◈",
    color: "text-purple-300",
    note: "Organization departments",
  },
  {
    label: "Monthly Payroll",
    value: `₹${statistics.monthlyPayroll.toLocaleString("en-IN")}`,
    icon: "₹",
    color: "text-sky-300",
    note: "Total monthly salary",
  },
  {
    label: "Average Salary",
    value: `₹${Math.round(statistics.averageSalary).toLocaleString("en-IN")}`,
    icon: "↗",
    color: "text-amber-300",
    note: "Average employee salary",
  },
];

  useEffect(()=>{
    async function fetchDashboard(){
     
      try{
        const response = await fetch("/api/dashboard");
        const data = await response.json();

        if(!response.ok){
          throw new Error(data.message || "Faild to fetch dashboard");
        }

        setStatistics(data.statistics);
        setRecentEemployees(data.recentEmployees);
      }catch(error){
        console.error(error.message || "Dashboard Fetch error:", error);
        setError(error.message);
      }finally{
        setLoading(false);
      }
    }
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-[#111713] text-[#F4F7EE]">
      

      <main className="mx-auto max-w-7xl px-5 py-9 sm:px-8">
        {/* Welcome section */}
        <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.2em] text-[#C7F36B]">
              OVERVIEW / WORKSPACE
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Good to see you<span className="text-[#C7F36B]">.</span>
            </h1>

            <p className="mt-3 text-sm text-[#A3AD9E]">
              Here&apos;s what&apos;s happening across your organization.
            </p>
          </div>

          <Link
            href="/employees/add"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C7F36B] px-5 py-3 text-sm font-bold text-[#111713] transition hover:bg-[#D8FF8A]"
          >
            <span className="text-lg">+</span>
            Add employee
          </Link>
        </section>

        {/* Statistics */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-[#343D34] bg-[#19211B] p-5 transition hover:border-[#647450]"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#A3AD9E]">{stat.label}</p>
                <span className={`text-xl ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-[#667064]">{stat.note}</p>
            </article>
          ))}
        </section>

        {/* Main dashboard content */}
        <section className="mt-8 grid gap-6 xl:grid-cols-3">
          {/* Recent employees */}
          <div className="overflow-hidden rounded-2xl border border-[#343D34] bg-[#19211B] xl:col-span-2">
            <div className="flex items-center justify-between gap-3 border-b border-[#343D34] px-5 py-5 sm:px-6">
              <div>
                <h2 className="font-semibold">Recent employees</h2>
                <p className="mt-1 text-xs text-[#A3AD9E]">
                  Your employee directory at a glance
                </p>
              </div>

              <Link
                href="/employees"
                className="shrink-0 text-sm font-semibold text-[#C7F36B] transition hover:text-[#D8FF8A]"
              >
                View all →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#151C16] text-xs text-[#A3AD9E]">
                  <tr>
                    <th className="px-5 py-4 font-medium">Employee</th>
                    <th className="px-5 py-4 font-medium">Department</th>
                    <th className="px-5 py-4 font-medium">Salary</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#343D34]">
                  {recentEmployees.map((employee) => (
                    <tr
                      key={employee.id}
                      className="transition hover:bg-[#202920]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#C7F36B]/10 font-bold text-[#C7F36B]">
                            {employee.initials}
                          </div>

                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="mt-1 text-xs text-[#A3AD9E]">
                              {employee.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-[#C7D0C1]">
                        {employee.department}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 font-medium">
                        ₹{Number(employee.salary).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#343D34] px-5 py-4 text-xs text-[#667064]">
              Showing {recentEmployees.length} recent employees
            </div>
          </div>

          {/* Quick actions */}
          <aside className="rounded-2xl border border-[#343D34] bg-[#19211B] p-5 sm:p-6">
            <h2 className="font-semibold">Quick actions</h2>
            <p className="mt-1 text-xs text-[#A3AD9E]">
              Common tasks for your workspace
            </p>

            <div className="mt-6 space-y-3">
              <Link
                href="/employees/add"
                className="flex items-center gap-4 rounded-xl border border-[#343D34] p-4 transition hover:border-[#647450] hover:bg-[#202920]"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-[#C7F36B]/10 text-xl text-[#C7F36B]">
                  +
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    Add employee
                  </span>
                  <span className="mt-1 block text-xs text-[#A3AD9E]">
                    Register a new team member
                  </span>
                </span>
              </Link>

              <Link
                href="/employees"
                className="flex items-center gap-4 rounded-xl border border-[#343D34] p-4 transition hover:border-[#647450] hover:bg-[#202920]"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-sky-400/10 text-sky-300">
                  <span className="text-xl">☷</span>
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    Manage employees
                  </span>
                  <span className="mt-1 block text-xs text-[#A3AD9E]">
                    Browse your employee directory
                  </span>
                </span>
              </Link>

              <Link
                href="/departments"
                className="flex items-center gap-4 rounded-xl border border-[#343D34] p-4 transition hover:border-[#647450] hover:bg-[#202920]"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-purple-400/10 text-xl text-purple-300">
                  ◈
                </span>
                <span>
                  <span className="block text-sm font-semibold">
                    View departments
                  </span>
                  <span className="mt-1 block text-xs text-[#A3AD9E]">
                    Explore teams and departments
                  </span>
                </span>
              </Link>
            </div>
          </aside>
        </section>

        {/* Activity section */}
        <section className="mt-6 rounded-2xl border border-[#343D34] bg-[#19211B] p-5 sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold">Workspace activity</h2>
            <p className="mt-1 text-xs text-[#A3AD9E]">
              Project setup overview
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {activities.map((activity, index) => (
              <div key={activity.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#C7F36B]/10 text-sm font-bold text-[#C7F36B]">
                    {index + 1}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium">{activity.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-[#A3AD9E]">
                    {activity.detail}
                  </p>
                  <p className="mt-2 text-[11px] text-[#667064]">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="py-8 text-center text-xs text-[#667064]">
          orbitHR · Employee Management System
        </footer>
      </main>
    </div>
  );
}
