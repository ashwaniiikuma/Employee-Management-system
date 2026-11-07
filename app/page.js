import Link from "next/link"
import {motion} from "framer-motion";
export default function HomePage(){

  const features = [
  {
    number: "01",
    title: "Employee management",
    description:
      "Keep employee profiles, contact details, departments and salary information organized in one place.",
    icon: "◉",
  },
  {
    number: "02",
    title: "Department overview",
    description:
      "Understand how your organization is structured and keep teams easy to navigate.",
    icon: "◇",
  },
  {
    number: "03",
    title: "Centralized records",
    description:
      "Build a single workspace for employee information and everyday HR operations.",
    icon: "▤",
  },
];

const workflow = [
  {
    step: "01",
    title: "Add your team",
    description: "Create employee records with essential details.",
  },
  {
    step: "02",
    title: "Organize departments",
    description: "Keep your people grouped by their teams.",
  },
  {
    step: "03",
    title: "Manage everything",
    description: "Browse employee records from one workspace.",
  },
];


  return(
    <div className="min-h-screen overflow-hidden bg-[#111713] text-[#f4f7ee]">

        <main>
          <section className="relative">
            <div className="pointer-events-none absolute -right-40 -top-32 size-[480px] rounded-full bg-[#c7f36b]/[0.07] blur-[100px]"/>

            <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:py-28 lg:grid-cols-2 lg:py-32">
                <div>
                  <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#3A4934] bg-[#19211B] px-4 py-2 text-xs font-medium text-[#C7F36B]">
                    <span className="size-2 rounded-full bg-[#C7F36B]" />
                    A smarter way to manage your people
                  </div>

                  <h1 className="max-w-2xl text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">Your people.
                    <br />
                    Your teams.
                    <br />
                    <span className="text-[#c7f36b]">One workspace</span>
                  </h1>

                  <p className="mt-7 max-w-xl text-base leading-7 text-[#a3ad9e] sm:text-lg sm:leading-8">
                  Meet orbitHR — a simple, organized workspace to manage
                employee information, explore departments and keep your
                people operations moving.
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <Link href="/dashboard"
                    className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#c7f36b] px-6 py-4 font-bold text-[#111713] transition hover:bg-[#d8ff8a]">
                       Open Dashboard
                      <span className="text-lg">→</span>

                    </Link>

                     <Link
                  href="/employees"
                  className="inline-flex items-center justify-center rounded-xl border border-[#3A4934] px-6 py-4 text-sm font-semibold text-[#F4F7EE] transition hover:bg-[#19211B]"
                >
                  Explore employees
                </Link>
                  </div>

                    <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-[#a3ad9e]">
                      <span className="flex items-center gap-2">
                       <span className="text-[#C7F36B]">✓</span>
                        Organized employee records
                      </span>
                      <span className="flex items-center gap-2">
                      <span className="text-[#C7F36B]">✓</span>
                        Team visibility
                      </span>
                    </div>
                </div>

                {/* Product preview */}
                <div className="relative  max-auto w-full max-w-xl">
                  <div className="absolute -insert-5 rounded-[32px] bg-[#c7f36b]/[0.04] blur-2xl"/>
                    
                    <div className="relative rounded-3xl border border-[#3a4934] bg-[#19211b] p-4 shadow-2xl sm:p-6">
                     <div className="flex items-center justify-between border-b border-[#343D34] pb-5">
                        <div className="flex item-center gap-3">
                            <div className="grid size-10 place-items-center rounded-xl bg-[#C7F36B] font-black text-[#111713]">
                      ◉
                    </div>
                    <div>
                      <p className="font-bold">
                        orbit<span className="text-[#C7F36B]">HR</span>
                      </p>
                      <p className="mt-1 text-[10px] tracking-widest text-[#A3AD9E]">
                        PEOPLE OVERVIEW
                      </p>
                    </div>
                        </div>
                            <span className="rounded-full border border-[#3A4934] px-3 py-1.5 text-xs text-[#C7F36B]">
                    Workspace
                  </span>
                      </div>
                       <div className="py-6">
                  <p className="text-sm text-[#A3AD9E]">Your organization</p>
                  <h2 className="mt-1 text-2xl font-bold">
                    People at a glance<span className="text-[#C7F36B]">.</span>
                  </h2>
                </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-[#343d34] bg-[#111713] p-4">
                      <p className="text-xs text-[#A3AD9E]">Employees</p>
                    <p className="mt-3 text-3xl font-bold">02</p>
                    <p className="mt-2 text-xs text-[#C7F36B]">
                      Team directory
                    </p>
                    </div>

                     <div className="rounded-2xl border border-[#343D34] bg-[#111713] p-4">
                    <p className="text-xs text-[#A3AD9E]">Departments</p>
                    <p className="mt-3 text-3xl font-bold">05</p>
                    <p className="mt-2 text-xs text-sky-300">
                      Team structure
                    </p>
                  </div>
                  </div>
                  
                  <div className="mt-4 rounded-2xl border border-[#343d34] bg-[#111713] p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-sm font-semibold">Team directory</p>
                      <span className="text-xs text-[#a3ad9e]">Preview</span>
                    </div>

                    {[
                      {
                        name: "Ashwani",
                        role:"Development",
                        initials:"A",
                      },
                      {
                        name: "Rahul",
                        role:"Testing",
                        initials:"R",
                      },
                    ].map((person)=>(
                        <div key={person.name}
                        className="flex item-center justify-between gap-3 border-t border-[#343d34] py-3 first:border-t-0">
                          <div className="flex items-center gap-3">
                            <div className="grid size-10 place-items-center rounded-xl bg-[#c7f36b]/10 font-bold text-[#c7f36b]">
                                {person.initials}
                            </div>
                            <div>
                                <p className="text-sm font-medium">{person.name}</p>
                                <p className="mt-1 text-xs text-[#a3ad9e]">{person.role}</p>
                            </div>
                          </div>
                        <span className="size-2 rounded-full bg-[#c7f36b]"/>
                        </div>
                    ))}
                  </div>
                   <p className="mt-4 text-center text-[11px] text-[#667064]">
                  Illustrative preview · Sample data
                </p>

                <div>

                </div>
                    </div>
                  

                </div>
            </div>
          </section>

            {/* Features */}
        <section className="border-y border-[#343D34] bg-[#151C16]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-[0.2em] text-[#C7F36B]">
                BUILT FOR CLARITY
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                HR essentials, without the clutter.
              </h2>
              <p className="mt-4 leading-7 text-[#A3AD9E]">
                Bring everyday people-management tasks into one clear,
                consistent experience.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="group rounded-2xl border border-[#343D34] bg-[#19211B] p-6 transition hover:-translate-y-1 hover:border-[#647450]"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-[#C7F36B]/10 text-2xl text-[#C7F36B]">
                      {feature.icon}
                    </span>
                    <span className="text-xs tracking-widest text-[#667064]">
                      {feature.number}
                    </span>
                  </div>
                  <h3 className="mt-7 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#A3AD9E]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
          <div className="grid gap-12 lg:grid-cals-[0.8fr_1.2fr]">
            <div>

              <p className="text-xs font-bold tracking-[0.2em] text-[#c7f36b]">
                A SIMPLE WORKFLOW
              </p>

              <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">
                From employee details to a clearer organization.
              </h2>

             <p className="mt-5 leading-7 text-[#A3AD9E]">
                Start with your employee directory, organize people by
                department and manage records from your workspace.
              </p>
              <Link href="/employees" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#c7f36b] hover:text-[#d8ff8a] "
              >
                Browse employee directory<span>→</span>
              </Link>
            </div>

            <div className="space-y-3">
                {workflow.map((item)=>(
                  <div key={item.step}
                      className="flex gap-5 rounded-2xl border border-[#343D34] bg-[#19211B] p-5 sm:p-6"
>
                    <span className="text-sm font-bold tracking-widest text-[#c7f36b]">{item.step}</span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#A3AD9E]">
                      {item.description}
                    </p>
                  </div>
                  </div>

                ))}
            </div>
          </div>

        </section>

         {/* CTA */}
        <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 sm:pb-24">
          <div className="relative overflow-hidden rounded-3xl border border-[#647450] bg-[#19211B] px-6 py-12 sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-[#C7F36B]/10 blur-3xl" />
            <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-2xl">
                <p className="text-xs font-bold tracking-[0.2em] text-[#C7F36B]">
                  YOUR WORKSPACE STARTS HERE
                </p>
                <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                  Make people management feel simpler.
                </h2>
                <p className="mt-4 leading-7 text-[#A3AD9E]">
                  Explore your team directory and see your organization
                  in one place.
                </p>
              </div>

              <Link
                href="/dashboard"
                className="relative inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[#C7F36B] px-6 py-4 text-sm font-bold text-[#111713] transition hover:bg-[#D8FF8A]"
              >
                Go to dashboard <span className="text-lg">→</span>
              </Link>
            </div>
          </div>
        </section>

        </main>
         <footer className="border-t border-[#343D34]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-[#A3AD9E] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-sm font-bold text-[#F4F7EE]">
            orbit<span className="text-[#C7F36B]">HR</span>
          </p>
          <p>Employee Management System · Built for organized teams</p>
        </div>
      </footer>
    </div>
  )
}