"use client"
import Link from "next/link"
import { useSearchParams, useRouter,  } from "next/navigation"
import { useEffect, useState } from "react"

export default function AddEmployeePage(){

  const searchParams = useSearchParams();
  const router = useRouter();

  const id = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    departmentId: "",
    salary: "",
  });

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   async function handleSubmit(e){
    e.preventDefault();

    try{
      setLoading(true);
      setError("");

      const response= await fetch("/api/employees", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          departmentId: formData.departmentId? Number(formData.departmentId): null,
          salary: parseFloat(formData.salary),
        }),
      });

      const data = await response.json();

  

         if(!response.ok){
        throw new Error(data.message || "Failed to add employee");

      }
          alert("Employee added successfully!");
      router.push("/employees");
      router.refresh();
    }catch (err){
      setError(err.message || "Something went Wrong");
    }finally{
      setLoading(false);
    }
   }

   useEffect(()=>{
     if(!id) return;

     async function fetchEmployee(){
      try{
        setLoading(true);

        const response = await fetch(`/api/employees/${id}`);
        const data = response.json();

        if(!response.ok){
          throw new Error(data.message || "Failed to fetch employee");
        }

        setFormData({
          name: data.name,
          email: data.email,
          departmentId: String(data.departmentId || ""),
          salary: String(data.salary || ""),
        });
      }catch(err){
        setError(err.message);
      }finally{
        setLoading(false);
      }
     }

     fetchEmployee();
   }, [id]);


    return(
        <div className="min-h-screen bg-[#111713] text-[#f4f7ee]">

            <main className="max-auto max-w-4xl px-5 py-10 sm:px-8"> 
                <Link
          href="/employees"
          className="text-sm text-[#A3AD9E] transition hover:text-[#C7F36B]"
        >
          ← Back to employees
        </Link>

         <div className="mb-8 mt-6">
          <p className="mb-2 text-xs font-bold tracking-[0.2em] text-[#C7F36B]">
            PEOPLE OPERATIONS / EMPLOYEES
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Add new employee<span className="text-[#C7F36B]">.</span>
          </h1>
          <p className="mt-3 text-sm text-[#A3AD9E]">
            Add employee details to your organization directory.
          </p>
        </div>

        <form onSubmit={handleSubmit}
 className="rounded-2xl border border-[#343d34] bg-[#19211b] p-6 sm:p-8">
            <div className="smb-7 flex item-center gap-3 border-b border-[#343d34] pb-5">
                <div className="grid size-12 place-items-center rounded-xl  bg-[#c7f36b]/10 text-xl text-[#c7f36b]">
                +
                </div>
                <div>
                    <h2 className="ont-semibold">Employee information</h2>
                    <p className="mt-1 text-xs text-[#a3ad9e]">
                        Field marked with * are required.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
            <div>
                <label className="text-[#dce4d7] mb-2 blok text-sm">Full Name *</label>
                <input type="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({...formData, name: e.target.value})
                }
                name="name"
                placeholder="enter your email" 
                required
                className="w-full rounded-xl border border-[#343d34] bg-[#111713] px-4 py-3 text-sm outline-none transition placeholder:text-[#667064] placeholder:border-[#c7f36b]"/>
            </div>

            <div>
                <label className="mb-2 block text-sm text-[]#dce4d7">Email address </label>

                <input type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({...formData, email: e.target.value})
                }
                name="email"
                placeholder="Enter your email" 
                required
                className="w-full rounded-xl border border-[#343D34] bg-[#111713] px-4 py-3 text-sm outline-none transition placeholder:text-[#667064] focus:border-[#C7F36B]"/>
                
            </div>
            </div>
 <div>
              <label className="mb-2 block text-sm text-[#DCE4D7]">
                Department *
              </label>
              <select
                name="department"
                value={formData.departmentId}
                 onChange={(e) =>
                      setFormData({ ...formData, departmentId: e.target.value,
    })}
                required
                
                className="w-full rounded-xl border border-[#343D34] bg-[#111713] px-4 py-3 text-sm outline-none transition focus:border-[#C7F36B]"
              >
                <option value="" disabled>Select department </option>
                <option value="1">Development</option>
                <option value="2">Design</option>
                <option value="3">Testing</option>
                <option value="4">Human Resources</option>
                <option value="5">Marketing</option>
              </select>
            </div>

            <div>
                <label className="mb-2 block text-sm text-[#dce407]">
                     Monthly salary (₹) *
                </label>
                <input type="number"
                name="salary"
                value={formData.salary}
                onChange={(e)=>
                  setFormData({...formData, salary: e.target.value})
                }
                min="0"
                step="0.01"
                required
                placeholder="e.g. 25000"
                className="w-full rounded-xl border border-[#343d34] bg-[#111713] px-4 py-3 text-sm outline-none transition placeholder:text-[#667064] focus-within:border-[#c7f36b]" />
            </div>
            <div>
              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#343D34] pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/employees"
              className="rounded-xl border border-[#343D34] px-5 py-3 text-center text-sm font-semibold transition hover:bg-[#273027]"
            >
              Cancel
            </Link>
                {error && (
    <p className="mt-4 text-sm text-red-400">
        {error}
    </p>
)}
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#C7F36B] px-6 py-3 text-sm font-bold text-[#111713] transition hover:bg-[#D8FF8A]"
            >
              {loading? "saving...": "Save employee →"}
              
            </button>
          </div>
            </div>
        </form>

            </main>
        </div>
    )
}