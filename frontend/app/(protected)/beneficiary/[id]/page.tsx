"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function BeneficiaryPage() {
  const params = useParams();
  const router = useRouter();

  const [beneficiary, setBeneficiary] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

    const [memberName, setMemberName] =
  useState("");

const [relationship, setRelationship] =
  useState("");

const [age, setAge] =
  useState("");

const [memberGender, setMemberGender] =
  useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetchBeneficiary();
  }, []);

  async function fetchBeneficiary() {
    try {
      const response = await api.get(
        `/beneficiaries/${params.id}`
      );

      setBeneficiary(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this beneficiary?"
    );

    if (!confirmed) return;

    try {
      await api.delete(
        `/beneficiaries/${params.id}`
      );

      alert(
        "Beneficiary deleted successfully"
      );

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  }

  async function handleAddFamilyMember() {
  try {
    await api.post("/family-members", {
      name: memberName,
      relationship,
      age: Number(age),
      gender: memberGender,
      beneficiaryId: beneficiary.id,
    });

    setMemberName("");
    setRelationship("");
    setAge("");
    setMemberGender("");

    await fetchBeneficiary();

    alert("Family member added");
  } catch (error) {
    console.error(error);
    alert("Failed to add family member");
  }
}

async function handleRemoveMember(
  memberId: number
) {
  const confirmed = window.confirm(
    "Remove this family member?"
  );

  if (!confirmed) return;

  try {
    await api.delete(
      `/family-members/${memberId}`
    );

    await fetchBeneficiary();

    alert("Family member removed");
  } catch (error) {
    console.error(error);
    alert("Delete failed");
  }
}
  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (!beneficiary) {
    return (
      <div className="p-8">
        Beneficiary not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-lg shadow p-6">

          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">
              Beneficiary Details
            </h1>

            <div className="flex gap-3">
              <button
                onClick={() =>
                  router.push(
                    `/beneficiary/${params.id}/edit`
                  )
                }
                className="bg-blue-700 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <strong>
                Beneficiary Number:
              </strong>
              <br />
              {
                beneficiary.beneficiaryNumber
              }
            </div>

            <div>
              <strong>Name:</strong>
              <br />
              {beneficiary.firstName}{" "}
              {beneficiary.lastName}
            </div>

            <div>
              <strong>Gender:</strong>
              <br />
              {beneficiary.gender}
            </div>

            <div>
              <strong>Phone:</strong>
              <br />
              {beneficiary.phone}
            </div>

            <div>
              <strong>State:</strong>
              <br />
              {beneficiary.state}
            </div>

            <div>
              <strong>LGA:</strong>
              <br />
              {beneficiary.lga}
            </div>

            <div>
              <strong>Ward:</strong>
              <br />
              {beneficiary.ward}
            </div>

            <div>
              <strong>Address:</strong>
              <br />
              {beneficiary.address}
            </div>

          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mt-6">

          <h2 className="text-xl font-semibold mb-4">
            Family Members
          </h2>

          <div className="grid grid-cols-2 gap-4 mb-6">

  <input
    type="text"
    placeholder="Name"
    value={memberName}
    onChange={(e) =>
      setMemberName(e.target.value)
    }
    className="border p-3 rounded"
  />

  <input
    type="text"
    placeholder="Relationship"
    value={relationship}
    onChange={(e) =>
      setRelationship(e.target.value)
    }
    className="border p-3 rounded"
  />

  <input
    type="number"
    placeholder="Age"
    value={age}
    onChange={(e) =>
      setAge(e.target.value)
    }
    className="border p-3 rounded"
  />

  <input
    type="text"
    placeholder="Gender"
    value={memberGender}
    onChange={(e) =>
      setMemberGender(e.target.value)
    }
    className="border p-3 rounded"
  />

</div>

<button
  onClick={handleAddFamilyMember}
  className="bg-green-600 text-white px-4 py-2 rounded mb-6"
>
  + Add Family Member
</button>

          {beneficiary.familyMembers
            ?.length ? (
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">
                    Name
                  </th>
                  <th className="text-left p-2">
                    Relationship
                  </th>
                  <th className="text-left p-2">
                    Age
                  </th>
                  <th className="text-left p-2">
                    Gender
                  </th>
                  <th className="text-left p-2">
                    Action
                   </th>
                </tr>
              </thead>

              <tbody>
                {beneficiary.familyMembers.map(
                  (member: any) => (
                    <tr
  key={member.id}
  className="border-t"
>
  <td className="p-2">
    {member.name}
  </td>

  <td className="p-2">
    {member.relationship}
  </td>

  <td className="p-2">
    {member.age}
  </td>

  <td className="p-2">
    {member.gender}
  </td>

  <td className="p-2">
    <button
      onClick={() =>
        handleRemoveMember(member.id)
      }
      className="text-red-600"
    >
      Remove
    </button>
  </td>
</tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            <p>
              No family members found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}