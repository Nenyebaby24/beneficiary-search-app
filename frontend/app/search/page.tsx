"use client";

import SearchFilters from "@/components/SearchFilters";
export default function SearchPage() {
  
  return (
    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-8">
        Beneficiary Search
      </h1>
         <SearchFilters />

    </div>
  );
}