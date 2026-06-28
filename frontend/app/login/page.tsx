"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();

    console.log("Login clicked");

    try {
      const response = await api.post("/auth/login", {
        phone,
        password,
      });

      console.log(response.data);

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 antialiased font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-slate-100 p-8 space-y-6">
        
        {/* Header Block with Lightning Bolt Icon */}
        <div className="flex items-center gap-3 pb-2 border-b border-slate-100">
          <svg 
            className="w-7 h-7 text-amber-500 fill-current" 
            viewBox="0 0 24 24"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <h2 className="text-2xl font-bold text-indigo-950">
            Sign in to Account
          </h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Phone Input Group */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-indigo-950">
              Phone
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="08032526629"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-rose-400 text-slate-700 placeholder-slate-400 focus:outline-none pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500 text-lg font-medium border border-rose-400 rounded-full w-5 h-5 flex items-center justify-center text-[12px]">
                !
              </span>
            </div>
            <p className="text-xs font-medium text-rose-500">
              Phone number must consist of exactly 10 digits
            </p>
          </div>

          {/* Password Input Group */}
          <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-indigo-950">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-rose-400 text-slate-700 placeholder-slate-400 focus:outline-none pr-10"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500 text-lg font-medium border border-rose-400 rounded-full w-5 h-5 flex items-center justify-center text-[12px]">
                !
              </span>
            </div>
            <p className="text-xs font-medium text-rose-500">
              Password must be at least 8 characters long
            </p>
          </div>

          {/* Captcha Block Component */}
          <div className="space-y-3 pt-1">
            <div className="text-3xl font-normal tracking-widest text-slate-800 font-mono select-none py-1">
              PXN7FY
            </div>
            <input
              type="text"
              placeholder="PXN7FY"
              disabled
              className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-400 placeholder-slate-400 focus:outline-none cursor-not-allowed"
            />
          </div>

          {/* Remember Me Checkbox Options */}
          <div className="flex items-center gap-2 py-1">
            <input
              type="checkbox"
              id="remember"
              defaultChecked
              className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
            />
            <label 
              htmlFor="remember" 
              className="text-sm font-semibold text-indigo-950 cursor-pointer select-none"
            >
              Remember Me
            </label>
          </div>

          {/* Styled Submit Button */}
          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition-colors duration-150 text-center"
          >
            Login
          </button>
          
        </form>
      </div>
    </div>
  );
}