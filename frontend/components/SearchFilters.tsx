import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

interface LookupItem {
  id: number;
  name: string;
}

export default function SearchFilters() {
  const router = useRouter();

  // ======================
  // Search Filters
  // ======================

  const [beneficiaryNumber, setBeneficiaryNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [schemeId, setSchemeId] = useState("");
  const [subSchemeId, setSubSchemeId] = useState("");

  const [stateLookupId, setStateLookupId] = useState("");
  const [districtId, setDistrictId] = useState("");

  const [lga, setLga] = useState("");
  const [ward, setWard] = useState("");

  // ======================
  // Lookup Lists
  // ======================

  const [schemes, setSchemes] = useState<LookupItem[]>([]);
  const [subSchemes, setSubSchemes] = useState<LookupItem[]>([]);
  const [states, setStates] = useState<LookupItem[]>([]);
  const [districts, setDistricts] = useState<LookupItem[]>([]);

  // ======================
  // Search Results
  // ======================

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  // ======================
  // Lookup Loaders
  // ======================

  const loadSchemes = async () => {
    try {
      const res = await api.get("/lookup/schemes");
      setSchemes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSubSchemes = async () => {
    try {
      const res = await api.get("/lookup/subschemes");
      setSubSchemes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadStates = async () => {
    try {
      const res = await api.get("/lookup/states");
      setStates(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadDistricts = async (stateId: number) => {
    try {
      const res = await api.get(
        `/lookup/districts/${stateId}`
      );

      setDistricts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // Search
  // ======================

  const handleSearch = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/beneficiaries/search",
        {
          params: {
            beneficiaryNumber,
            firstName,
            lastName,
            phone,

            schemeId,
            subSchemeId,

            stateLookupId,
            districtId,

            lga,
            ward,

            page,
            limit: 10,
          },
        }
      );

      setResults(response.data.data ?? []);

      setTotalPages(
        response.data.totalPages ?? 1
      );

      setTotalRecords(
        response.data.total ?? 0
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // Reset
  // ======================

  const resetFilters = () => {
    setBeneficiaryNumber("");
    setFirstName("");
    setLastName("");
    setPhone("");

    setSchemeId("");
    setSubSchemeId("");

    setStateLookupId("");
    setDistrictId("");

    setDistricts([]);

    setLga("");
    setWard("");

    setResults([]);

    setPage(1);
  };

  // ======================
  // Initial Load
  // ======================

  useEffect(() => {
    loadSchemes();
    loadSubSchemes();
    loadStates();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [page]);

  useEffect(() => {
    if (stateLookupId) {
      loadDistricts(Number(stateLookupId));
    } else {
      setDistricts([]);
      setDistrictId("");
    }
  }, [stateLookupId]);
  return (
    <>
      
{/* Search Form */}

<div className="bg-white rounded-lg shadow p-4 md:p-6">

  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

    <h2 className="text-lg font-semibold">
      Search Beneficiary
    </h2>

    <button
      onClick={() => router.push("/beneficiary/new")}
      className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto"
    >
      + New Beneficiary
    </button>

  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-9 gap-4">

    <input
      type="text"
      placeholder="Beneficiary N0"
      value={beneficiaryNumber}
      onChange={(e) => setBeneficiaryNumber(e.target.value)}
      className="border p-3 rounded w-full"
    />

    <input
      type="text"
      placeholder="First Name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      className="border p-3 rounded w-full"
    />

    <input
      type="text"
      placeholder="Last Name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      className="border p-3 rounded w-full"
    />

    <input
      type="text"
      placeholder="Phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      className="border p-3 rounded w-full"
    />

    {/* Scheme */}

    <select
      value={schemeId}
      onChange={(e) => setSchemeId(e.target.value)}
      className="border p-3 rounded w-full"
    >
      <option value="">Schemes</option>

      {schemes.map((scheme) => (
        <option
          key={scheme.id}
          value={scheme.id}
        >
          {scheme.name}
        </option>
      ))}

    </select>

    {/* Sub Scheme */}

    <select
      value={subSchemeId}
      onChange={(e) => setSubSchemeId(e.target.value)}
      className="border p-3 rounded w-full"
    >
      <option value="">SubSchemes</option>

      {subSchemes.map((sub) => (
        <option
          key={sub.id}
          value={sub.id}
        >
          {sub.name}
        </option>
      ))}

    </select>

    {/* State */}

    <select
      value={stateLookupId}
      onChange={async (e) => {
  const value = e.target.value;

  setStateLookupId(value);
  setDistrictId("");

  if (value) {
    const res = await api.get(
      `/lookup/districts/${value}`
    );

    setDistricts(res.data);
  } else {
    setDistricts([]);
  }
}}
      className="border p-3 rounded w-full"
    >
      <option value="">States</option>

      {states.map((state) => (
        <option
          key={state.id}
          value={state.id}
        >
          {state.name}
        </option>
      ))}

    </select>

    {/* District */}

    <select
      value={districtId}
      onChange={(e) => setDistrictId(e.target.value)}
      className="border p-3 rounded w-full"
    >
      <option value="">Districts</option>

      {districts.map((district) => (
        <option
          key={district.id}
          value={district.id}
        >
          {district.name}
        </option>
      ))}

    </select>
     {/*  
     <input
      type="text"
      placeholder="LGA"
      value={lga}
      onChange={(e) => setLga(e.target.value)}
      className="border p-3 rounded"
    /> */}

    <input
      type="text"
      placeholder="Ward"
      value={ward}
      onChange={(e) => setWard(e.target.value)}
      className="border p-3 rounded w-full"
    />

  </div>

  <div className="flex flex-wrap gap-3 mt-6">

  <button
    onClick={handleSearch}
    className="
      bg-blue-700
      hover:bg-blue-800
      text-white
      px-5
      py-2
      rounded
      text-sm
      font-medium
      min-w-[110px]
      cursor-pointer
    "
  >
    Search
  </button>

  <button
    onClick={resetFilters}
    className="
      bg-gray-500
      hover:bg-gray-600
      text-white
      px-5
      py-2
      rounded
      text-sm
      font-medium
      min-w-[110px]
      cursor-pointer
    "
  >
    Reset
  </button>

</div>
</div>

      {/* Search Results */}
      <div className="mt-6 bg-white rounded-lg shadow overflow-hidden min-w-[900px]">

  <div className="p-4 border-b">

    <h3 className="font-semibold">
      Search Results
    </h3>

  </div>

  {loading ? (

    <div className="p-6">
      Loading...
    </div>

  ) : (
     <div className="overflow-x-auto">
    <table className="min-w-[900px] w-full">

      <thead>

        <tr className="bg-gray-50">

          <th className="px-3 py-2 text-left whitespace-nowrap">
            Beneficiary No
          </th>

          <th className="px-3 py-2 text-left whitespace-nowrap">
            Name
          </th>

          <th className="px-3 py-2 text-left whitespace-nowrap">
            Gender
          </th>

          <th className="px-3 py-2 text-left whitespace-nowrap">
            Phone
          </th>

          <th className="px-3 py-2 text-left whitespace-nowrap">
            State
          </th>

          <th className="px-3 py-2 text-left whitespace-nowrap">
            Action
          </th>

        </tr>

      </thead>

      <tbody>

        {results.length === 0 ? (

          <tr>

            <td
              colSpan={6}
              className="text-center p-8 text-gray-500"
            >
              No beneficiaries found.
            </td>

          </tr>

        ) : (

          results.map((beneficiary: any) => (

            <tr
              key={beneficiary.id}
              className="border-t"
            >

              <td className="px-3 py-2 whitespace-nowrap">
                {beneficiary.beneficiaryNumber}
              </td>

              <td className="px-3 py-2 whitespace-nowrap">
                {beneficiary.firstName} {beneficiary.lastName}
              </td>

              <td className="px-3 py-2 whitespace-nowrap">
                {beneficiary.gender}
              </td>

              <td className="px-3 py-2 whitespace-nowrap">
                {beneficiary.phone}
              </td>

              <td className="px-3 py-2 whitespace-nowrap">
                {beneficiary.state}
              </td>

              <td className="px-3 py-2 whitespace-nowrap">

                <button
                  onClick={() =>
                    router.push(
                      `/beneficiary/${beneficiary.id}`
                    )
                  }
                  className="text-blue-700 cursor-pointer"
                >
                  View
                </button>

              </td>

            </tr>

          ))

        )}

      </tbody>

    </table>
    </div>

  )}

</div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-4 border-t bg-white rounded-b-lg">

  <div className="text-gray-600">
    Total Records: {totalRecords}
  </div>

  <div className="flex flex-wrap items-center gap-2">

    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className={`px-4 py-2 rounded ${
        page === 1
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
      }`}
    >
      Previous
    </button>

    <span className="px-4 py-2">
      Page {page} of {totalPages}
    </span>

    <button
      disabled={page === totalPages || totalPages === 0}
      onClick={() => setPage(page + 1)}
      className={`px-4 py-2 rounded ${
        page === totalPages || totalPages === 0
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-gray-200 hover:bg-gray-300 cursor-pointer"
      }`}
    >
      Next
    </button>

  </div>

</div>

    
  

    </>
  );
}