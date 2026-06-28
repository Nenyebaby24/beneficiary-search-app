"use client";

import {useEffect,useState } from "react";
import api from "@/lib/api";

export default function ReportsPage() {
  const [state, setState] = useState("");
  const [gender, setGender] = useState("");
  const [reports, setReports] =
  useState<any[]>([]);

  const loadReports = async () => {
  try {
    const token =
      localStorage.getItem("token");

    const response =
      await api.get(
        "/beneficiaries/reports",
        {
          params: {
            state,
            gender,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    setReports(response.data);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  loadReports();
}, []);
  return (
    <div>

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Reports
      </h1>

      <div className="bg-white rounded-lg shadow p-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <input
            type="date"
            className="border rounded p-3"
          />

          <input
            type="date"
            className="border rounded p-3"
          />

          <input
            placeholder="State"
            value={state}
            onChange={(e)=>setState(e.target.value)}
            className="border rounded p-3"
          />

          <select
            value={gender}
            onChange={(e)=>setGender(e.target.value)}
            className="border rounded p-3"
          >
            <option value="">
              All Gender
            </option>

            <option>
              Male
            </option>

            <option>
              Female
            </option>

          </select>

        </div>

        <div className="flex gap-4 mt-6">

          <button
           onClick={loadReports}
            className="bg-blue-700 text-white px-6 py-3 rounded"
          >
            Generate Report
          </button>

          <button
            className="bg-green-700 text-white px-6 py-3 rounded"
          >
            Export Excel
          </button>

          <button
            className="bg-red-600 text-white px-6 py-3 rounded"
          >
            Export PDF
          </button>

          <button
            className="bg-gray-700 text-white px-6 py-3 rounded"
          >
            Print
          </button>

        </div>

      </div>

      <div className="bg-white shadow rounded-lg mt-8">

        <div className="p-4 border-b">

          <h2 className="font-semibold">
            Report Result
          </h2>

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
                Phone
              </th>

              <th className="p-3 text-left">
                State
              </th>

            </tr>

          </thead>

          <tbody>
            {reports.map((beneficiary: any) => (

    <tr
      key={beneficiary.id}
      className="border-t"
    >
      <td className="p-3">
        {beneficiary.beneficiaryNumber}
      </td>

      <td className="p-3">
        {beneficiary.firstName}{" "}
        {beneficiary.lastName}
      </td>

      <td className="p-3">
        {beneficiary.gender}
      </td>

      <td className="p-3">
        {beneficiary.phone}
      </td>

      <td className="p-3">
        {beneficiary.state}
      </td>

    </tr>

  ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}