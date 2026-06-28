"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

import SearchFilters from "@/components/SearchFilters";


export default function Dashboard() {
  const router = useRouter();

 


  const [stats, setStats] = useState({
  beneficiaries: 0,
  familyMembers: 0,
  maleBeneficiaries: 0,
  femaleBeneficiaries: 0,
  recentBeneficiaries: [],
});
 
  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);

    if (!token) {
      router.push("/login");
      return;
    }

    const loadStats = async () => {
      try {
        const response = await api.get(
          "/dashboard/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStats(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadStats();
  }, [router]);

 

  
 

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Beneficiary Search Portal
        </h1>

        <button
          onClick={logout}
          className="bg-white text-blue-700 px-4 py-2 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500">
              Total Beneficiaries
            </h3>

            <p className="text-4xl font-bold text-blue-700 mt-2">
              {stats.beneficiaries}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-gray-500">
              Total Family Members
            </h3>

            <p className="text-4xl font-bold text-green-700 mt-2">
              {stats.familyMembers}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-gray-500">
    Male Beneficiaries
  </h3>

  <p className="text-4xl font-bold text-blue-600 mt-2">
    {stats.maleBeneficiaries}
  </p>
</div>

<div className="bg-white rounded-lg shadow p-6">
  <h3 className="text-gray-500">
    Female Beneficiaries
  </h3>

        <p className="text-4xl font-bold text-pink-600 mt-2">
            {stats.femaleBeneficiaries}
              </p>
           </div>
            </div>

      
            </div>

              <SearchFilters />

            <div className="mt-8 bg-white rounded-lg shadow">

         <div className="p-4 border-b">

         <h3 className="font-semibold">
              Recent Beneficiaries
        </h3>

         </div>

        <table className="w-full">

         <thead>

      <tr className="bg-gray-50">

        <th className="p-3 text-left">
          Beneficiary No
        </th>

        <th className="p-3 text-left">
          Name
        </th>

        <th className="p-3 text-left">
          Gender
        </th>

        <th className="p-3 text-left">
          State
        </th>

      </tr>

    </thead>

    <tbody>

      {stats.recentBeneficiaries.map(
        (b: any) => (

          <tr
            key={b.id}
            className="border-t"
          >
            <td className="p-3">
              {b.beneficiaryNumber}
            </td>

            <td className="p-3">
              {b.firstName} {b.lastName}
            </td>

            <td className="p-3">
              {b.gender}
            </td>

            <td className="p-3">
              {b.state}
            </td>

          </tr>

      ))}

    </tbody>

  </table>

</div>
           
            
      </div>
    
)}