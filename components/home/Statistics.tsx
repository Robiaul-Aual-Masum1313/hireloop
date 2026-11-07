
import {
  BriefcaseBusiness,
  Building2,
  UsersRound,
  Star,
} from "lucide-react";

const statistics = [
  {
    icon: BriefcaseBusiness,
    value: "50K",
    label: "Active Jobs",
  },
  {
    icon: Building2,
    value: "12K",
    label: "Companies",
  },
  {
    icon: UsersRound,
    value: "2M",
    label: "Job Seekers",
  },
  {
    icon: Star,
    value: "97%",
    label: "Satisfaction Rate",
  },
];

export default function Statistics() {
  return (
    <section
      id="company"
      className="relative z-10 mt-auto pt-48 sm:pt-56 md:pt-64"
    >
      {/* Statistics heading */}
      <h2 className="mx-auto mb-8 max-w-[550px] text-center text-2xl font-medium leading-snug tracking-tight text-white/75 sm:text-3xl">
        Assisting over{" "}
        <span className="text-white">15,000 job seekers</span>
        <br className="hidden sm:block" />{" "}
        find their dream positions.
      </h2>

      {/* Statistics cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {statistics.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="group flex min-h-[145px] flex-col justify-between rounded-xl border border-white/[0.08] bg-gradient-to-br from-black/95 via-[#09090b]/95 to-[#202022]/95 p-4 shadow-xl backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#6254ff]/40 sm:min-h-[155px] sm:p-5 md:min-h-[160px]"
            >
              <Icon
                size={17}
                strokeWidth={1.8}
                className="text-white transition group-hover:text-[#8175ff]"
              />

              <div>
                <h3 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </h3>

                <p className="mt-2 text-[11px] text-gray-200 sm:text-xs">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
