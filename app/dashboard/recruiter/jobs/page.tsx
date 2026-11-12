"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  ChevronRight,
  Globe,
  MapPin,
  Users,
  Pencil,
  Trash2,
  MoreVertical,
  Code2,
  Palette,
  Cpu,
  Megaphone,
  ShieldCheck,
  Search,
} from "lucide-react";
import type { IjobFromData } from "./addjob/page";

// Extended interface following IjobFromData with UI metadata
export interface IJobListItem extends IjobFromData {
  _id: string;
  department: string;
  applicantsCount: number;
  status: "Active" | "Expired";
  postedAt: string;
  iconType: "code" | "design" | "devops" | "marketing" | "qa";
}


export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<IJobListItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    async function fetchJobs(){
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`)
      const resultJobs = await res.json()
      setJobs(resultJobs)
    }
    fetchJobs()
  },[])

  // Delete handler with user confirmation
  const handleDeleteJob = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the job posting for "${title}"?`)) {
      setJobs((prev) => prev.filter((job) => job._id !== id));
    }
  };

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) => {
    const query = searchQuery.toLowerCase();
    return (
      job.jobTitle.toLowerCase().includes(query) ||
      job.department.toLowerCase().includes(query) ||
      job.companyName.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    );
  });

  // Helper to format compensation string
  const formatCompensation = (job: IJobListItem) => {
    const isHourly = job.frequency.toLowerCase().includes("hour");
    const suffix = isHourly ? "/ hr" : "/ yr";
    return `€${job.minSalary} – €${job.maxSalary} ${suffix}`;
  };

  // Helper to format deadline date nicely
  const formatDeadlineDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  // Helper to render icon for each job category/type
  const renderJobIcon = (type: IJobListItem["iconType"]) => {
    switch (type) {
      case "code":
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#38bdf8]/20 bg-[#38bdf8]/10 text-[#38bdf8]">
            <Code2 size={18} />
          </div>
        );
      case "design":
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#fb923c]/20 bg-[#fb923c]/10 text-[#fb923c]">
            <Palette size={18} />
          </div>
        );
      case "devops":
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#38bdf8]/20 bg-[#38bdf8]/10 text-[#38bdf8]">
            <Cpu size={18} />
          </div>
        );
      case "marketing":
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#c084fc]/20 bg-[#c084fc]/10 text-[#c084fc]">
            <Megaphone size={18} />
          </div>
        );
      case "qa":
        return (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#818cf8]/20 bg-[#818cf8]/10 text-[#818cf8]">
            <ShieldCheck size={18} />
          </div>
        );
    }
  };

  // Helper for department text colors matching the UI screenshot
  const getDeptColor = (dept: string) => {
    switch (dept) {
      case "Engineering":
        return "text-[#38bdf8]";
      case "Design":
        return "text-[#fb923c]";
      case "Infrastructure":
        return "text-[#38bdf8]";
      case "Marketing":
        return "text-[#c084fc]";
      case "Quality":
        return "text-[#818cf8]";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] space-y-6">
      {/* Header section with Breadcrumb & Action Button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {/* Breadcrumbs */}
          <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-400">
            <span className="transition hover:text-white">Manage Jobs</span>
            <ChevronRight size={13} className="text-gray-500" />
            <span className="font-medium text-[#9d94ff]">
              Job Listings & Postings
            </span>
          </div>

          {/* Heading & Subtitle */}
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Manage Job Posts
          </h1>
          <p className="mt-1 text-xs text-gray-400 sm:text-sm">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>

        {/* Action Button: + New Job Post */}
        <Link
          href="/dashboard/recruiter/jobs/addjob"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#6355ff] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,85,255,0.4)] transition duration-200 hover:bg-[#7569ff] active:scale-[0.98]"
        >
          <Plus size={16} />
          <span>New Job Post</span>
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search job title, company, or location..."
            className="w-full rounded-xl border border-white/10 bg-[#121215] py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 outline-none transition duration-200 focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff] sm:text-sm"
          />
        </div>

        <div className="text-xs text-gray-400">
          Showing <span className="font-semibold text-white">{filteredJobs.length}</span> jobs
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-2xl backdrop-blur-xl">
        {/* ======================================================== */}
        {/* DESKTOP & TABLET VIEW: Scrollable Responsive Table */}
        {/* ======================================================== */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[1050px] border-collapse text-left text-sm">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-white/[0.08] bg-white/[0.02] text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <th className="py-4 pl-6 pr-4">JOB TITLE & DEPT</th>
                <th className="px-4 py-4">COMPANY & LOCATION</th>
                <th className="px-4 py-4">TYPE</th>
                <th className="px-4 py-4">COMPENSATION</th>
                <th className="px-4 py-4">APPLICANTS</th>
                <th className="px-4 py-4">STATUS</th>
                <th className="px-4 py-4">DEADLINE</th>
                <th className="py-4 pl-4 pr-6 text-right">ACTIONS</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/[0.05]">
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-sm text-gray-400">
                    No job postings found matching your search.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => (
                  <tr
                    key={job._id}
                    className="group transition-colors duration-150 hover:bg-white/[0.02]"
                  >
                    {/* 1. Job Title & Dept */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        {renderJobIcon(job.iconType)}
                        <div>
                          <div className="font-medium text-white transition group-hover:text-white">
                            {job.jobTitle}
                          </div>
                          <div className={`text-xs font-medium ${getDeptColor(job.department)}`}>
                            {job.department}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Company & Location */}
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-200">
                          {job.companyName}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          {job.isRemote ? (
                            <Globe size={13} className="shrink-0 text-gray-400" />
                          ) : (
                            <MapPin size={13} className="shrink-0 text-gray-400" />
                          )}
                          <span>{job.location}</span>
                        </div>
                      </div>
                    </td>

                    {/* 3. Type */}
                    <td className="px-4 py-4">
                      <span className="inline-block rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
                        {job.jobType}
                      </span>
                    </td>

                    {/* 4. Compensation */}
                    <td className="px-4 py-4 font-medium text-white">
                      {formatCompensation(job)}
                    </td>

                    {/* 5. Applicants */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-[#a594fd]">
                        <Users size={15} className="shrink-0" />
                        <span>{job.applicantsCount} Candidates</span>
                      </div>
                    </td>

                    {/* 6. Status */}
                    <td className="px-4 py-4">
                      {job.status === "Active" ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-gray-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                          Expired
                        </span>
                      )}
                    </td>

                    {/* 7. Deadline */}
                    <td className="px-4 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-200">
                          {formatDeadlineDate(job.deadline)}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          {job.postedAt}
                        </div>
                      </div>
                    </td>

                    {/* 8. Actions */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Update Button */}
                        <Link
                          href={`/dashboard/recruiter/jobs/addjob?edit=${job.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#6355ff]/30 bg-[#6355ff]/15 px-3 py-1.5 text-xs font-medium text-[#a594fd] transition duration-150 hover:border-[#6355ff]/50 hover:bg-[#6355ff]/25 active:scale-95"
                        >
                          <Pencil size={12} />
                          <span>Update</span>
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDeleteJob(job.id, job.jobTitle)}
                          className="rounded-lg border border-white/10 bg-white/[0.02] p-1.5 text-gray-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 active:scale-95"
                          title="Delete Job"
                        >
                          <Trash2 size={14} />
                        </button>

                        {/* More Options */}
                        <button
                          type="button"
                          className="rounded-lg p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-white"
                          title="More options"
                        >
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ======================================================== */}
        {/* MOBILE VIEW: Stacked Responsive Cards */}
        {/* ======================================================== */}
        <div className="divide-y divide-white/[0.08] md:hidden">
          {filteredJobs.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400">
              No job postings found matching your search.
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div key={job._id} className="space-y-4 p-5">
                {/* Header: Icon, Title, Status */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {renderJobIcon(job.iconType)}
                    <div>
                      <h3 className="font-medium text-white">{job.jobTitle}</h3>
                      <p className={`text-xs font-medium ${getDeptColor(job.department)}`}>
                        {job.department} • {job.companyName}
                      </p>
                    </div>
                  </div>

                  {job.status === "Active" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                      Expired
                    </span>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                    <span className="text-[11px] text-gray-500">Location</span>
                    <p className="mt-0.5 flex items-center gap-1 text-gray-300">
                      {job.isRemote ? <Globe size={12} /> : <MapPin size={12} />}
                      <span className="truncate">{job.location}</span>
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                    <span className="text-[11px] text-gray-500">Compensation</span>
                    <p className="mt-0.5 font-medium text-white">
                      {formatCompensation(job)}
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                    <span className="text-[11px] text-gray-500">Applicants</span>
                    <p className="mt-0.5 flex items-center gap-1 font-semibold text-[#a594fd]">
                      <Users size={13} />
                      <span>{job.applicantsCount} Candidates</span>
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
                    <span className="text-[11px] text-gray-500">Deadline</span>
                    <p className="mt-0.5 text-gray-300">
                      {formatDeadlineDate(job.deadline)}
                    </p>
                  </div>
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between border-t border-white/[0.05] pt-3">
                  <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-400">
                    {job.jobType}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/recruiter/jobs/addjob?edit=${job.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[#6355ff]/30 bg-[#6355ff]/15 px-3 py-1.5 text-xs font-medium text-[#a594fd] transition hover:bg-[#6355ff]/25"
                    >
                      <Pencil size={12} />
                      <span>Update</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDeleteJob(job.id, job.jobTitle)}
                      className="rounded-lg border border-white/10 bg-white/[0.02] p-1.5 text-gray-400 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
