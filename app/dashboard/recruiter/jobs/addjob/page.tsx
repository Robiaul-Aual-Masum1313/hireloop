"use client";

import {
  useState,
  useRef,
  useEffect,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Calendar,
  Globe,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  Check,
} from "lucide-react";
import { createJob } from "@/lib/actions/jobs";

// ============================================================================
// Custom Select Component:
// Fixes native OS dropdown bug where hover background and text color match.
// Provides distinct hover styling: background is soft purple, text is crisp white.
// ============================================================================
function CustomSelect({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Hidden input to ensure standard form submission works */}
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[#141417] px-4 py-3 text-sm text-white outline-none transition duration-200 hover:border-white/20 focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff]"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          size={17}
          className={`shrink-0 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-white" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute left-0 z-50 mt-1.5 max-h-60 w-full overflow-auto rounded-xl border border-white/10 bg-[#19191d] p-1.5 shadow-2xl backdrop-blur-2xl">
          {options.map((option) => {
            const isSelected = option === value;
            return (
              <li
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3.5 py-2.5 text-sm transition-colors duration-150 ${
                  isSelected
                    ? "bg-[#6355ff] font-medium text-white shadow-sm"
                    : "text-gray-300 hover:bg-[#6355ff]/25 hover:text-white"
                }`}
              >
                <span>{option}</span>
                {isSelected && <Check size={15} className="text-white" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// ============================================================================
// Custom Date Picker Component:
// Allows clicking to open an interactive calendar popover to choose a deadline.
// ============================================================================
function CustomDatePicker({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial date or default to current date
  const selectedDate = value ? new Date(value) : null;
  const [viewYear, setViewYear] = useState(() =>
    selectedDate && !isNaN(selectedDate.getTime())
      ? selectedDate.getFullYear()
      : new Date().getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(() =>
    selectedDate && !isNaN(selectedDate.getTime())
      ? selectedDate.getMonth()
      : new Date().getMonth()
  );

  // Close when clicked outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const handleSelectDay = (day: number) => {
    const m = String(viewMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onChange(`${viewYear}-${m}-${d}`);
    setIsOpen(false);
  };

  const isCurrentSelected = (day: number) => {
    if (!value) return false;
    const parts = value.split("-");
    if (parts.length !== 3) return false;
    return (
      Number(parts[0]) === viewYear &&
      Number(parts[1]) === viewMonth + 1 &&
      Number(parts[2]) === day
    );
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center rounded-xl border border-white/10 bg-[#141417] py-3 pl-10 pr-4 text-sm text-white transition duration-200 hover:border-white/20 focus-within:border-[#6355ff] focus-within:ring-1 focus-within:ring-[#6355ff]"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
          <Calendar size={17} />
        </div>
        <input
          type="text"
          readOnly
          name="deadline"
          value={value}
          placeholder={placeholder}
          className="w-full cursor-pointer bg-transparent text-sm text-white placeholder-gray-500 outline-none"
        />
      </div>

      {isOpen && (
        <div className="absolute left-0 z-50 mt-2 w-72 rounded-2xl border border-white/10 bg-[#16161a] p-4 shadow-2xl backdrop-blur-2xl sm:w-80">
          {/* Header with Month/Year and navigation arrows */}
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-semibold text-white">
              {monthNames[viewMonth]} {viewYear}
            </h4>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-gray-300 transition hover:bg-white/10 hover:text-white"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-[11px] font-medium text-gray-400">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {/* Blank offset cells */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`blank-${i}`} />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const selected = isCurrentSelected(day);
              const today = isToday(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleSelectDay(day)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-all ${
                    selected
                      ? "bg-[#6355ff] text-white shadow-[0_0_12px_rgba(99,85,255,0.4)]"
                      : today
                      ? "border border-[#6355ff]/50 text-[#9d94ff] hover:bg-white/10"
                      : "text-gray-200 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Bottom shortcuts (Today / Clear) */}
          <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-2">
            <button
              type="button"
              onClick={() => {
                const today = new Date();
                const m = String(today.getMonth() + 1).padStart(2, "0");
                const d = String(today.getDate()).padStart(2, "0");
                onChange(`${today.getFullYear()}-${m}-${d}`);
                setIsOpen(false);
              }}
              className="text-[11px] font-medium text-[#8175ff] transition hover:text-[#9b92ff]"
            >
              Today
            </button>
            {value && (
              <button
                type="button"
                onClick={() => {
                  onChange("");
                  setIsOpen(false);
                }}
                className="text-[11px] text-gray-400 transition hover:text-red-400"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Main Add New Job Page
// ============================================================================

export interface IjobFromData {
    jobTitle: string,
    companyName: string,
    jobCategory: string,
    jobType: string,
    isRemote: boolean,
    location: string,
    deadline: string,
    minSalary: string,
    maxSalary: string,
    frequency: string,
    responsibilities: string,
    requirements: string,
  }
export default function AddNewJobPage() {
  // 1. Beginner-friendly state object to collect all form fields
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    jobCategory: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: true,
    location: "",
    deadline: "",
    minSalary: "",
    maxSalary: "",
    frequency: "per hour",
    responsibilities: "",
    requirements: "",
  });

  // State to show submission feedback
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 2. Simple handler for standard text inputs and textareas
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Simple handler for job type selection (Full-time, Part-time, Contract, Internship)
  const handleJobType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      jobType: type,
    }));
  };

  // 4. Simple handler to toggle remote work switch
  const handleToggleRemote = () => {
    setFormData((prev) => ({
      ...prev,
      isRemote: !prev.isRemote,
    }));
  };

  // 5. Submit handler to collect the final data
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("=== Submitted Job Data ===", formData);
    const result = await createJob(formData)
    console.log(result);
    
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

  const categories = [
    "Engineering & Tech",
    "Design & Creative",
    "Product Management",
    "Marketing & Sales",
    "Finance & Accounting",
    "Operations & HR",
    "Customer Support",
  ];

  const frequencies = ["per hour", "per month", "per year"];

  return (
    <div className="mx-auto w-full max-w-5xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Main Card Container */}
        <div className="rounded-2xl border border-white/10 bg-[#0d0d10] p-6 shadow-2xl backdrop-blur-xl sm:p-8 md:p-10">
          {/* Header section with Breadcrumb & Publish Button */}
          <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              {/* Breadcrumbs */}
              <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
                <Link
                  href="/dashboard/recruiter/jobs"
                  className="transition hover:text-white"
                >
                  Manage Jobs
                </Link>
                <ChevronRight size={13} className="text-gray-500" />
                <span className="font-medium text-[#9d94ff]">
                  Create New Listing
                </span>
              </div>

              {/* Title & Description */}
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Post a New Job
              </h1>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                Fill in the position specifications to attract qualified talent
                across our network.
              </p>
            </div>

            {/* Top Publish Button */}
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6355ff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,85,255,0.4)] transition duration-200 hover:bg-[#7569ff] active:scale-[0.98]"
            >
              <span>Publish Job</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Submission Banner */}
          {isSubmitted && (
            <div className="mt-6 flex items-center gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-300">
              <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
              <span>
                Job details saved and logged to console! Check your browser
                console to view the collected object.
              </span>
            </div>
          )}

          {/* ======================================================== */}
          {/* SECTION 1: Basic Information */}
          {/* ======================================================== */}
          <div className="mt-8 space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-[#6355ff] ring-4 ring-[#6355ff]/20" />
              <h2>1. Basic Information</h2>
            </div>

            {/* Job Title */}
            <div className="space-y-1.5">
              <label
                htmlFor="jobTitle"
                className="block text-xs font-medium text-gray-300"
              >
                Job Title <span className="text-[#8175ff]">*</span>
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                required
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Frontend Developer"
                className="w-full rounded-xl border border-white/10 bg-[#141417] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition duration-200 focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff]"
              />
            </div>

            {/* Company Name & Job Category */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Company Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="companyName"
                  className="block text-xs font-medium text-gray-300"
                >
                  Company Name <span className="text-[#8175ff]">*</span>
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                    <Building2 size={17} />
                  </div>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="HirePulse Network"
                    className="w-full rounded-xl border border-white/10 bg-[#141417] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition duration-200 focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff]"
                  />
                </div>
              </div>

              {/* Job Category with Custom Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-300">
                  Job Category <span className="text-[#8175ff]">*</span>
                </label>
                <CustomSelect
                  name="jobCategory"
                  value={formData.jobCategory}
                  options={categories}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, jobCategory: val }))
                  }
                />
              </div>
            </div>

            {/* Job Type Segmented Buttons */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300">
                Job Type <span className="text-[#8175ff]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {jobTypes.map((type) => {
                  const isSelected = formData.jobType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleJobType(type)}
                      className={`rounded-xl border py-3 text-center text-xs font-medium transition-all duration-200 sm:text-sm ${
                        isSelected
                          ? "border-[#6355ff] bg-[#6355ff]/15 font-semibold text-white shadow-[0_0_15px_rgba(99,85,255,0.25)] ring-1 ring-[#6355ff]"
                          : "border-white/10 bg-[#141417] text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 2: Location, Compensation & Timeline */}
          {/* ======================================================== */}
          <div className="mt-10 space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-[#6355ff] ring-4 ring-[#6355ff]/20" />
              <h2>2. Location, Compensation & Timeline</h2>
            </div>

            {/* Remote Work Switch Card */}
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-[#141417] p-4 transition duration-200 hover:border-white/15">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-gray-300">
                  <Globe size={19} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-white">
                    Remote Work Allowed (isRemote)
                  </h3>
                  <p className="text-xs text-gray-400">
                    Enable worldwide or distributed candidate applications
                  </p>
                </div>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={formData.isRemote}
                onClick={handleToggleRemote}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  formData.isRemote ? "bg-[#6355ff]" : "bg-[#27272a]"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition duration-200 ease-in-out ${
                    formData.isRemote ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {/* Location & Application Deadline */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Job Location */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="location"
                    className="block text-xs font-medium text-gray-300"
                  >
                    Job Location (location)
                  </label>
                  <span className="text-[11px] text-gray-500">Required</span>
                </div>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                    <MapPin size={17} />
                  </div>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, USA"
                    className="w-full rounded-xl border border-white/10 bg-[#141417] py-3 pl-10 pr-4 text-sm text-white placeholder-gray-500 outline-none transition duration-200 focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff]"
                  />
                </div>
              </div>

              {/* Application Deadline with Date Picker */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-300">
                  Application Deadline (deadline)
                </label>
                <CustomDatePicker
                  value={formData.deadline}
                  placeholder="Select deadline (YYYY-MM-DD)"
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, deadline: val }))
                  }
                />
              </div>
            </div>

            {/* Min Salary, Max Salary, Frequency */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Min Salary */}
              <div className="space-y-1.5">
                <label
                  htmlFor="minSalary"
                  className="block text-xs font-medium text-gray-300"
                >
                  Min Salary / Rate
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-medium text-gray-400">
                    €
                  </span>
                  <input
                    id="minSalary"
                    name="minSalary"
                    type="number"
                    value={formData.minSalary}
                    onChange={handleChange}
                    placeholder="25"
                    className="w-full rounded-xl border border-white/10 bg-[#141417] py-3 pl-9 pr-4 text-sm text-white placeholder-gray-500 outline-none transition duration-200 focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff]"
                  />
                </div>
              </div>

              {/* Max Salary */}
              <div className="space-y-1.5">
                <label
                  htmlFor="maxSalary"
                  className="block text-xs font-medium text-gray-300"
                >
                  Max Salary / Rate
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-medium text-gray-400">
                    €
                  </span>
                  <input
                    id="maxSalary"
                    name="maxSalary"
                    type="number"
                    value={formData.maxSalary}
                    onChange={handleChange}
                    placeholder="40"
                    className="w-full rounded-xl border border-white/10 bg-[#141417] py-3 pl-9 pr-4 text-sm text-white placeholder-gray-500 outline-none transition duration-200 focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff]"
                  />
                </div>
              </div>

              {/* Frequency with Custom Select */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-gray-300">
                  Frequency
                </label>
                <CustomSelect
                  name="frequency"
                  value={formData.frequency}
                  options={frequencies}
                  onChange={(val) =>
                    setFormData((prev) => ({ ...prev, frequency: val }))
                  }
                />
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SECTION 3: Responsibilities & Requirements */}
          {/* ======================================================== */}
          <div className="mt-10 space-y-4">
            {/* Section Header */}
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <span className="h-2 w-2 rounded-full bg-[#6355ff] ring-4 ring-[#6355ff]/20" />
              <h2>3. Responsibilities & Requirements</h2>
            </div>

            {/* Key Responsibilities */}
            <div className="space-y-1.5">
              <label
                htmlFor="responsibilities"
                className="block text-xs font-medium text-gray-300"
              >
                Key Responsibilities <span className="text-[#8175ff]">*</span>
              </label>
              <textarea
                id="responsibilities"
                name="responsibilities"
                rows={4}
                required
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                className="w-full rounded-xl border border-white/10 bg-[#141417] p-4 text-sm leading-relaxed text-white placeholder-gray-500 outline-none transition duration-200 focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff]"
              />
            </div>

            {/* Qualifications & Requirements */}
            <div className="space-y-1.5">
              <label
                htmlFor="requirements"
                className="block text-xs font-medium text-gray-300"
              >
                Qualifications & Requirements{" "}
                <span className="text-[#8175ff]">*</span>
              </label>
              <textarea
                id="requirements"
                name="requirements"
                rows={5}
                required
                value={formData.requirements}
                onChange={handleChange}
                placeholder="• 3+ years of experience with React, TypeScript, and modern state architectures&#10;• Solid understanding of DOM performance and component-driven designs&#10;• Experience partnering closely with product teams and UI/UX designers"
                className="w-full rounded-xl border border-white/10 bg-[#141417] p-4 text-sm leading-relaxed text-white placeholder-gray-500 outline-none transition duration-200 focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
