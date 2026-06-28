"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function EditBeneficiary() {
  const params = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    beneficiaryNumber: "",
    firstName: "",
    lastName: "",
    gender: "",
    phone: "",
    state: "",
    lga: "",
    ward: "",
    address: "",
  });

  useEffect(() => {
    loadBeneficiary();
  }, []);

  async function loadBeneficiary() {
    try {
      const response = await api.get(
        `/beneficiaries/${params.id}`
      );

      setForm(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await api.put(
        `/beneficiaries/${params.id}`,
        form
      );

      alert(
        "Beneficiary updated successfully"
      );

      router.push(
        `/beneficiary/${params.id}`
      );
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-6">

        <h1 className="text-2xl font-bold mb-6">
          Edit Beneficiary
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-4"
        >
          <input
            placeholder="Beneficiary Number"
            value={form.beneficiaryNumber}
            onChange={(e) =>
              setForm({
                ...form,
                beneficiaryNumber:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) =>
              setForm({
                ...form,
                firstName:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) =>
              setForm({
                ...form,
                lastName:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Gender"
            value={form.gender}
            onChange={(e) =>
              setForm({
                ...form,
                gender:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({
                ...form,
                phone:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="State"
            value={form.state}
            onChange={(e) =>
              setForm({
                ...form,
                state:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="LGA"
            value={form.lga}
            onChange={(e) =>
              setForm({
                ...form,
                lga:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <input
            placeholder="Ward"
            value={form.ward}
            onChange={(e) =>
              setForm({
                ...form,
                ward:
                  e.target.value,
              })
            }
            className="border p-3 rounded"
          />

          <textarea
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address:
                  e.target.value,
              })
            }
            className="border p-3 rounded col-span-2"
          />

          <button
            type="submit"
            className="bg-blue-700 text-white py-3 rounded col-span-2"
          >
            Save Changes
          </button>
        </form>

      </div>
    </div>
  );
}