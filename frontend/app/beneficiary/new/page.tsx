"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function NewBeneficiaryPage() {
  const router = useRouter();

  const [form, setForm] = useState({
  firstName: "",
  lastName: "",
  gender: "",
  phone: "",
  address: "",

  schemeId: "",
  subSchemeId: "",
  stateLookupId: "",
  districtId: "",

  lga: "",
  ward: "",
});

type LookupItem = {
  id: number;
  name: string;
};

const [schemes, setSchemes] = useState<LookupItem[]>([]);
const [subSchemes, setSubSchemes] = useState<LookupItem[]>([]);
const [states, setStates] = useState<LookupItem[]>([]);
const [districts, setDistricts] = useState<LookupItem[]>([]);
  const [loading, setLoading] =
    useState(false);

    useEffect(() => {
  loadSchemes();
  loadSubSchemes();
  loadStates();
}, []);

const loadSchemes = async () => {
  try {
    const res = await api.get("/lookup/schemes");
    setSchemes(res.data);
  } catch (error) {
    console.error("Failed to load schemes", error);
  }
};

const loadSubSchemes = async () => {
  try {
    const res = await api.get("/lookup/subschemes");
    setSubSchemes(res.data);
  } catch (error) {
    console.error("Failed to load sub schemes", error);
  }
};
const loadStates = async () => {
  try {
    const res = await api.get("/lookup/states");
    setStates(res.data);
  } catch (error) {
    console.error("Failed to load states", error);
  }
};



const loadDistricts = async (stateId: number) => {
  try {
    const res = await api.get(
      `/lookup/districts/${stateId}`
    );

    setDistricts(res.data);
  } catch (error) {
    console.error("Failed to load districts", error);
  }
};

  const handleChange = async (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement
  >
) => {
  const { name, value } = e.target;

  if (name === "stateLookupId") {
    setForm((prev) => ({
      ...prev,
      stateLookupId: value,
      districtId: "",
    }));

    if (value) {
      await loadDistricts(Number(value));
    } else {
      setDistricts([]);
    }

    return;
  }

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};
  
const handleSubmit = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  try {
    setLoading(true);

    const token = localStorage.getItem("token");

    const payload = {
      ...form,

      schemeId: form.schemeId
        ? Number(form.schemeId)
        : null,

      subSchemeId: form.subSchemeId
        ? Number(form.subSchemeId)
        : null,

      stateLookupId: form.stateLookupId
        ? Number(form.stateLookupId)
        : null,

      districtId: form.districtId
        ? Number(form.districtId)
        : null,
    };

    console.log(payload);

    await api.post(
      "/beneficiaries",
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Beneficiary created successfully");

    router.push("/dashboard");

  } catch (error) {
    console.error(error);
    alert("Failed to create beneficiary");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">

        <h1 className="text-2xl font-bold mb-6">
          New Beneficiary
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >
          
<input
  name="firstName"
  value={form.firstName}
  placeholder="First Name"
  onChange={handleChange}
  className="border p-3 rounded"
/>

          <input
            name="lastName"
            value={form.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
  name="schemeId"
  value={form.schemeId}
  onChange={handleChange}
  className="border p-3 rounded"
>
  <option value="">Select Scheme</option>

  {schemes.map((scheme) => (
    <option
      key={scheme.id}
      value={scheme.id}
    >
      {scheme.name}
    </option>
  ))}
</select>

<select
  name="subSchemeId"
  value={form.subSchemeId}
  onChange={handleChange}
  className="border p-3 rounded"
>
  <option value="">Select Sub Scheme</option>

  {subSchemes.map((sub) => (
    <option
      key={sub.id}
      value={sub.id}
    >
      {sub.name}
    </option>
  ))}
</select>

          <select
  name="gender"
  value={form.gender}
  onChange={handleChange}
  className="border p-3 rounded"
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
</select>
          <input
            name="phone"
            value={form.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
  name="stateLookupId"
  value={form.stateLookupId}
  onChange={handleChange}
  className="border p-3 rounded"
>
  <option value="">Select State</option>

  {states.map((state) => (
    <option
      key={state.id}
      value={state.id}
    >
      {state.name}
    </option>
  ))}
</select>

          <select
  name="districtId"
  value={form.districtId}
  onChange={handleChange}
  className="border p-3 rounded"
>
  <option value="">Select District</option>

  {districts.map((district) => (
    <option
      key={district.id}
      value={district.id}
    >
      {district.name}
    </option>
  ))}
</select>

<input
  name="lga"
  placeholder="LGA"
  value={form.lga}
  onChange={handleChange}
  className="border p-3 rounded"
/>

          <input
            name="ward"
            placeholder="Ward"
            value={form.ward}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="border p-3 rounded col-span-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-700 text-white py-3 rounded col-span-2"
          >
            {loading
              ? "Saving..."
              : "Create Beneficiary"}
          </button>
        </form>
      </div>
    </div>
  );
}