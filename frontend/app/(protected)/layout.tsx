"use client";

import { ReactNode,useEffect,
  useState, } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const [userName, setUserName] =
  useState("Administrator");

  const [currentDateTime, setCurrentDateTime] =
  useState("");

useEffect(() => {
  const user =
    localStorage.getItem("user");

  if (user) {
    const parsed =
      JSON.parse(user);

    setUserName(
  parsed.firstName && parsed.lastName
    ? `${parsed.firstName} ${parsed.lastName}`
    : parsed.name ||
      parsed.username ||
      "Administrator"
);
  }

  const updateClock = () => {
    setCurrentDateTime(
      new Date().toLocaleString()
    );
  };

  updateClock();

  const timer =
    setInterval(updateClock, 1000);

  return () =>
    clearInterval(timer);
}, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}

     <aside className="fixed left-0 top-0 h-screen w-56 bg-blue-900 text-white flex flex-col">

  <div className="p-6 border-b border-blue-700">
    <h2 className="font-bold text-xl">
      Beneficiary Portal
    </h2>
  </div>

  <nav className="p-4 flex flex-col gap-2">

    <Link
  href="/dashboard"
  className="px-4 py-3 rounded hover:bg-blue-800"
>
  Dashboard
</Link>

{/*<Link
  href="/dashboard"
  className="px-4 py-3 rounded hover:bg-blue-800"
>
  Beneficiaries
</Link>*/}

<Link
  href="/beneficiary/new"
  className="px-4 py-3 rounded hover:bg-blue-800"
>
  Add Beneficiary
</Link>

 <Link
    href="/search"
    className="px-4 py-3 rounded hover:bg-blue-800"
  >
    Search Beneficiary
  </Link>

<Link
  href="/reports"
  className="px-4 py-3 rounded hover:bg-blue-800"
>
  Reports
</Link>

<Link
  href="/settings"
  className="px-4 py-3 rounded hover:bg-blue-800"
>
  Settings
</Link>
   <button
  onClick={logout}
  className="
    px-4
    py-3
    rounded
    text-left
    hover:bg-red-600
    bg-red-500
    w-24
    mt-4
    cursor-pointer
  "
>
  Logout
</button>

  </nav>

</aside>

      {/* Content */}

      <main className="flex-1 ml-56 bg-gray-100 overflow-x-auto min-h-screen">
        <header className="bg-white shadow border-b">

  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-3 px-6 py-4">

    {/* Left */}

    <div>
      <h1 className="text-2xl font-bold text-blue-900">
        Beneficiary Search Portal
      </h1>

      <p className="text-sm text-gray-500">
        PM-JAY Beneficiary Management System
      </p>
    </div>

    {/* Right */}

    <div className="text-right whitespace-nowrap">

      <p className="font-semibold text-blue-900">
        {userName}
      </p>

      <p className="text-sm text-gray-500">
  {currentDateTime}
</p>

    </div>

  </div>

</header>

        <div className="p-6">
          <div className="min-w-[1000px] max-w-7xl mx-auto">
          {children}
          </div>
        </div>
      </main>
    </div>
  );
}