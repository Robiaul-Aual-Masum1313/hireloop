"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  User,
  Mail,
  Lock,
  Image as ImageIcon,
  Eye,
  EyeOff,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Briefcase,
  Building2,
  ShieldCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

type UserRole = "seeker" | "recruiter" | "admin";

const roleOptions: {
  id: UserRole;
  label: string;
  description: string;
  icon: typeof Briefcase;
}[] = [
  {
    id: "seeker",
    label: "Seeker",
    description: "Looking for jobs",
    icon: Briefcase,
  },
  {
    id: "recruiter",
    label: "Recruiter",
    description: "Hiring talent",
    icon: Building2,
  },
  {
    id: "admin",
    label: "Admin",
    description: "Platform admin",
    icon: ShieldCheck,
  },
];

export default function SignUpPage() {
  const router = useRouter();

  const [role, setRole] = useState<UserRole>("seeker");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<"google" | "github" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const { data, error: signUpError } = await authClient.signUp.email({
        name,
        email,
        password,
        image: imageUrl.trim() ? imageUrl.trim() : undefined,
        role,
        callbackURL: "/",
      });

      if (signUpError) {
        setError(signUpError.message || "Failed to create account. Please try again.");
      } else if (data) {
        router.push("/");
        router.refresh();
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "google" | "github") => {
    setError(null);
    setSocialLoading(provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : `Failed to initialize ${provider} sign-in.`;
      setError(message);
      setSocialLoading(null);
    }
  };

  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#050506] px-4 py-12 text-white sm:px-6 lg:px-8">
      {/* Background image matching home page */}
      <div
        className="
          pointer-events-none
          absolute inset-0 -z-20
          bg-[url('/images/hero-globe.png')]
          bg-cover
          bg-center
          bg-no-repeat
          opacity-50
          max-lg:bg-[length:950px_auto]
          max-md:bg-[length:850px_auto]
          max-sm:bg-[length:780px_auto]
        "
      />

      {/* Dark overlay */}
      <div
        className="
          pointer-events-none
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-[#202022]/90
          via-transparent
          to-black/60
        "
      />

      {/* Purple glow */}
      <div
        className="
          pointer-events-none
          absolute bottom-[10%] left-1/2 -z-10
          h-[320px] w-[80%]
          max-w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[#5145ff]/20
          blur-[130px]
        "
      />

      <div className="relative z-10 w-full max-w-[480px]">
        {/* Back to home & logo bar */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={15} />
            <span>Back to home</span>
          </Link>

          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight transition hover:opacity-90 sm:text-2xl"
          >
            <span className="text-[#168cff]">hire</span>
            <span className="text-[#ff6a00]">loop</span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#19191c]/95 to-[#111113]/95 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
          {/* Card Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Create an account
            </h1>
            <p className="mt-2 text-xs text-gray-400 sm:text-sm">
              Join HireLoop to discover and apply for top tech opportunities
            </p>
          </div>

          {/* Social Sign Up / In Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {/* Google */}
            <button
              type="button"
              disabled={isLoading || socialLoading !== null}
              onClick={() => handleSocialSignIn("google")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-white transition duration-200 hover:border-white/25 hover:bg-white/[0.08] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              {socialLoading === "google" ? (
                <Loader2 className="h-4 w-4 animate-spin text-gray-300" />
              ) : (
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.9 6.4C.7 8.8 0 10.8 0 12s.7 3.2 1.9 5.6l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16c1.8 3.8 5.6 7 10.1 7z"
                  />
                </svg>
              )}
              <span>Google</span>
            </button>

            {/* GitHub */}
            <button
              type="button"
              disabled={isLoading || socialLoading !== null}
              onClick={() => handleSocialSignIn("github")}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-xs font-medium text-white transition duration-200 hover:border-white/25 hover:bg-white/[0.08] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
            >
              {socialLoading === "github" ? (
                <Loader2 className="h-4 w-4 animate-spin text-gray-300" />
              ) : (
                <svg className="h-4 w-4 shrink-0 fill-current" viewBox="0 0 24 24">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              )}
              <span>GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-white/10" />
            <span className="absolute bg-[#161619] px-3 text-[11px] uppercase tracking-wider text-gray-400">
              or continue with email
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-300">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection: Seeker | Recruiter | Admin */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-gray-300">
                I want to join as:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roleOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = role === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setRole(opt.id)}
                      className={`group relative flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all duration-200 ${
                        isSelected
                          ? "border-[#6355ff] bg-[#6355ff]/15 text-white shadow-[0_0_15px_rgba(99,85,255,0.25)] ring-1 ring-[#6355ff]"
                          : "border-white/10 bg-[#161618] text-gray-400 hover:border-white/20 hover:text-gray-200"
                      }`}
                    >
                      <Icon
                        className={`mb-1.5 h-4 w-4 transition-colors ${
                          isSelected
                            ? "text-[#8175ff]"
                            : "text-gray-400 group-hover:text-gray-300"
                        }`}
                      />
                      <span className="text-xs font-semibold">{opt.label}</span>
                      <span className="text-[10px] text-gray-500">
                        {opt.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 1. Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-300"
              >
                Full name
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-[#161618] py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 transition duration-200 outline-none focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff] sm:text-sm"
                />
              </div>
            </div>

            {/* 2. Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-300"
              >
                Email address
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-white/10 bg-[#161618] py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 transition duration-200 outline-none focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff] sm:text-sm"
                />
              </div>
            </div>

            {/* 3. Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full rounded-xl border border-white/10 bg-[#161618] py-2.5 pl-10 pr-10 text-xs text-white placeholder-gray-500 transition duration-200 outline-none focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff] sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 transition hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* 4. Image URL */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="imageUrl"
                  className="block text-xs font-medium text-gray-300"
                >
                  Profile Image URL
                </label>
                <span className="text-[11px] text-gray-500">Optional</span>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                  <ImageIcon className="h-4 w-4" />
                </div>
                <input
                  id="imageUrl"
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full rounded-xl border border-white/10 bg-[#161618] py-2.5 pl-10 pr-4 text-xs text-white placeholder-gray-500 transition duration-200 outline-none focus:border-[#6355ff] focus:ring-1 focus:ring-[#6355ff] sm:text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || socialLoading !== null}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#6355ff] py-2.5 text-xs font-medium text-white shadow-[0_0_20px_rgba(99,85,255,0.25)] transition duration-200 hover:bg-[#7569ff] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create Account ({role})</span>
              )}
            </button>
          </form>

          {/* Footer Link to Sign In */}
          <p className="mt-6 text-center text-xs text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-[#8175ff] transition hover:text-[#9b92ff] hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
