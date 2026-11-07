
"use client";

import { useState, type FormEvent } from "react";
import { Search, MapPin } from "lucide-react";

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
];

export default function Banner() {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      jobTitle,
      location,
    });
  };

  return (
    <section
      id="jobs"
      className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center pt-20 text-center sm:pt-24 md:pt-28"
    >
      {/* New jobs badge */}
      <div className="relative mb-6 flex items-center justify-center">
        <span className="absolute -left-10 h-px w-10 bg-gradient-to-r from-transparent to-[#554bff]/60 sm:-left-16 sm:w-16" />

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#19191c]/90 px-4 py-2 shadow-lg backdrop-blur-md">
          <span className="text-base">💼</span>

          <span className="text-xs font-bold tracking-wider text-white sm:text-sm">
            50,000+
          </span>

          <span className="text-[10px] tracking-widest text-gray-400 sm:text-xs">
            NEW JOBS THIS MONTH
          </span>
        </div>

        <span className="absolute -right-10 h-px w-10 bg-gradient-to-l from-transparent to-[#554bff]/60 sm:-right-16 sm:w-16" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[42px]">
        Find Your Dream Job Today
      </h1>

      <p className="mt-3 max-w-[540px] px-2 text-sm leading-6 text-gray-400 sm:text-[15px]">
        HireLoop connects top talent with world-class companies.
        Browse thousands of curated opportunities and land your next role
        — faster.
      </p>

      {/* Search form */}
      <form
        onSubmit={handleSearch}
        className="mt-8 flex w-full max-w-[650px] flex-col gap-2 rounded-xl border border-white/15 bg-[#111113]/95 p-2 shadow-[0_0_30px_rgba(0,0,0,0.3)] backdrop-blur-xl sm:flex-row sm:items-center sm:gap-0 sm:p-1"
      >
        {/* Job title */}
        <div className="flex min-w-0 flex-1 items-center gap-2 px-3 py-2 sm:px-4">
          <Search size={19} className="shrink-0 text-gray-300" />

          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job title, skill or company"
            className="w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-gray-400 sm:text-sm"
          />
        </div>

        {/* Divider */}
        <div className="hidden h-7 w-px bg-white/15 sm:block" />

        {/* Location */}
        <div className="flex min-w-0 flex-1 items-center gap-2 border-t border-white/10 px-3 py-2 sm:border-t-0 sm:px-4">
          <MapPin size={18} className="shrink-0 text-gray-300" />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location or Remote"
            className="w-full min-w-0 bg-transparent text-xs text-white outline-none placeholder:text-gray-400 sm:text-sm"
          />
        </div>

        {/* Search button */}
        <button
          type="submit"
          aria-label="Search jobs"
          className="flex h-10 w-full shrink-0 items-center justify-center rounded-lg bg-[#6254ff] text-white transition hover:bg-[#796dff] sm:h-10 sm:w-10"
        >
          <Search size={19} />
          <span className="ml-2 sm:hidden">Search Jobs</span>
        </button>
      </form>

      {/* Trending positions */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[11px] sm:text-xs">
        <span className="mr-1 text-gray-400">
          Trending Position
        </span>

        {trendingPositions.map((position) => (
          <button
            key={position}
            type="button"
            onClick={() => setJobTitle(position)}
            className="rounded-full border border-white/[0.08] bg-[#242426]/90 px-3 py-1.5 text-gray-300 transition hover:border-[#6254ff]/60 hover:bg-[#6254ff]/20 hover:text-white"
          >
            {position}
          </button>
        ))}
      </div>
    </section>
  );
}
