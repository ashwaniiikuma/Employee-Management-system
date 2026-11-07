"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const[error, setError] = useState("");

  const router = useRouter();
  
  //Edit Employee

   function handleEdit(id){
    router.push(`/employees/add?id=${id}`);
  }

  const totalEmployee = employees.length;

  const totalDepartments = new Set(
    employees.map((employee)=> employee.department_id)
  ).size;

  const monthlyPayroll = employees.reduce(
    (total, employee) => total + Number(employee.salary || 0),
    0
  )

  //  Delete Employee

  async function handleDelete(id){
    const confirmed = window.confirm(
      "Are you sure you  want to delete this employee?"
    );

    if(!confirmed) return;

    try{
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if(!response.ok){
        throw new Error(data.message || "Failed to delete employee")
      }

      //update employees list without refreshing page 
      setEmployees((prevEmployees) => prevEmployees.filter((employee)=> employee.id !==id)
      )
    }catch (error){
      alert(error.message || "Something went wrong");
    }
  }



  useEffect(()=>{
    async function fetchEmployees(){
      try{
        const response = await fetch("/api/employees");
        const data = await response.json();

        if(!response.ok){
          throw new Error(
            data.message || "Failed to fetch employees"
          );
        }

        setEmployees(data);
      }catch(err){
        setError(err.message || "Something went wrong");
      }finally{
        setLoading(false);
      }
    }
    fetchEmployees();
  }, []);


  return (
    <div className="min-h-screen bg-[#111713] text-[#F4F7EE]">
      

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {/* Page Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#C7F36B]">
              PEOPLE DIRECTORY
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Employees<span className="text-[#C7F36B]">.</span>
            </h1>

            <p className="mt-2 text-sm text-[#A3AD9E]">
              Manage your people, all in one place.
            </p>
          </div>

          <Link
            href="/employees/add"
            className="w-fit rounded-xl bg-[#C7F36B] px-5 py-3 text-sm font-bold text-[#111713] transition hover:bg-[#D8FF8A]"
          >
            + Add employee
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#343D34] bg-[#19211B] p-5">
            <p className="text-sm text-[#A3AD9E]">Total employees</p>
            <h2 className="mt-3 text-3xl font-bold">
              {totalEmployee}
              </h2>
            <p className="mt-2 text-xs text-[#C7F36B]">
              Employee records
            </p>
          </div>

          <div className="rounded-2xl border border-[#343D34] bg-[#19211B] p-5">
            <p className="text-sm text-[#A3AD9E]">Departments</p>
            <h2 className="mt-3 text-3xl font-bold">
              {totalDepartments}
              </h2>
            <p className="mt-2 text-xs text-[#C7F36B]">
              Across the organization
            </p>
          </div>

          <div className="rounded-2xl border border-[#343D34] bg-[#19211B] p-5">
            <p className="text-sm text-[#A3AD9E]">Monthly payroll</p>
            <h2 className="mt-3 text-3xl font-bold">
              ₹{monthlyPayroll.toLocaleString("en-IN")}
              </h2>
            <p className="mt-2 text-xs text-[#C7F36B]">
              Total listed salaries
            </p>
          </div>
        </div>

        {/* Employees Table */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-[#343D34] bg-[#19211B]">
          <div className="flex flex-col gap-4 border-b border-[#343D34] p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">All employees</h2>
              <p className="mt-1 text-sm text-[#A3AD9E]">
                View and manage employee records.
              </p>
            </div>

            <input
              type="search"
              placeholder="Search employees..."
              className="w-full rounded-xl border border-[#343D34] bg-[#111713] px-4 py-3 text-sm outline-none placeholder:text-[#758071] focus:border-[#C7F36B] sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead className="bg-[#202B22] text-xs uppercase tracking-wider text-[#A3AD9E]">
                <tr>
                  <th className="px-5 py-4">Employee</th>
                  <th className="px-5 py-4">Department</th>
                  <th className="px-5 py-4">Salary</th>
                  <th className="px-5 py-4">Employee ID</th>
                  <th className="px-5 py-4">Actions</th>
                  <th className="px-5 py-4">Crud</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#343D34]">
               {loading && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-cednter text-[#a3ad9e]">
                      Loading employees...
                    </td>
                  </tr>
               )}
               {!loading && error &&(
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-red-400">
                    {error}
                  </td>
                </tr>
               )}

               {!loading && !error && employees.length === 0 && (
                <tr>
                  <td className="px-5 py-8 text-center text-[#a3ad9e]">
                    No employees found.
                  </td>
                </tr>
               )}

                {!loading && !error &&
                    employees.map((employee) => (
                      <tr key={employee.id}>
                        <td className="px-5 py-4">{employee.name}</td>
                        <td className="px-5 py-4">{employee.department}</td>
                        <td className="px-5 py-4">
                          ₹{Number(employee.salary).toLocaleString("en-IN")}
                        </td>
                        <td className="px-5 py-4">{employee.id}</td>
                        <td className="px-5 py-4">
                          {/* Existing Edit/Delete buttons yahan rakho */}
                        </td>

                        <td className="px-6 py-4">
  <div className="flex gap-3">
    <button
      className="text-[#C7F36B] hover:underline"
      onClick={() => handleEdit(employee.id)}
    >
      Edit
    </button>

    <button
      className="text-red-400 hover:underline"
      onClick={() => handleDelete(employee.id)}
    >
      Delete
    </button>
  </div>
</td>
                      </tr>
                      
                    ))}
                    
              </tbody>
              
            </table>
          </div>

          <div className="border-t border-[#343D34] px-5 py-4 text-xs text-[#A3AD9E]">
            Showing {employees.length} employees
          </div>
        </section>
      </main>
    </div>
  );
}
