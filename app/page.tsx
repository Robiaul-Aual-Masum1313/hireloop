
import Navbar from "@/components/home/Navbar";
import Banner from "@/components/home/Banner";
import Statistics from "@/components/home/Statistics";

export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-[#050506] text-white">

      {/* Globe background */}
      <div
        className="absolute inset-0 -z-20 bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-globe.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "center bottom",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#202022]/90 via-transparent to-black/20" />

      {/* Purple glow */}
      <div className="pointer-events-none absolute bottom-[5%] left-1/2 -z-10 h-[350px] w-[80%] -translate-x-1/2 rounded-full bg-[#5145ff]/15 blur-[120px]" />

      {/* Main content */}
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col px-4 pb-8 pt-5 sm:px-6 lg:px-10">

        <Navbar />

        <Banner />

        <Statistics />

      </div>
    </main>
  );
}
