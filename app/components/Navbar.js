"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Employees", href: "/employees" },
    { name: "Departments", href: "/department" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A342B] bg-[#0D120E]/90 text-[#F4F7EE] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#C7F36B] text-lg font-black text-[#0D120E] shadow-sm shadow-[#C7F36B]/20">
            ◉
          </span>
          <span>
            <span className="block text-lg font-extrabold tracking-tight sm:text-xl">
              orbit<span className="text-[#C7F36B]">HR</span>
            </span>
            <span className="block text-[8px] font-semibold tracking-[0.22em] text-[#A3AD9E] sm:text-[9px]">
              PEOPLE OPERATIONS
            </span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-[#C7F36B] text-[#0D120E] shadow-sm shadow-[#C7F36B]/20"
                    : "text-[#A3AD9E] hover:bg-[#151C16] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/employees/add"
            className="shrink-0 rounded-xl bg-[#C7F36B] px-4 py-2.5 text-sm font-bold text-[#0D120E] transition hover:bg-[#D8FF8A] active:scale-95 sm:px-5"
          >
            <span className="mr-1">+</span>
            <span className="hidden sm:inline">Add Employee</span>
            <span className="sm:hidden">Add</span>
          </Link>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            className="grid size-10 place-items-center rounded-xl border border-[#2A342B] bg-[#151C16] text-[#F4F7EE] transition hover:border-[#3A4934] md:hidden"
          >
            {isOpen ? (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[#2A342B] bg-[#131914] md:hidden"
          >
            <div className="flex flex-col gap-2 p-5">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-[#C7F36B] text-[#0D120E]"
                        : "text-[#A3AD9E] hover:bg-[#171F18] hover:text-white"
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="text-xs font-bold">●</span>}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}