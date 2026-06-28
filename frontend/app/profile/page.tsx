"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

const [editing, setEditing] =
  useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get(
        "/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!profile) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }
         const saveProfile = async () => {

  try {

    const token =
      localStorage.getItem("token");

    await api.put(
      "/users/profile",
      {
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

    alert("Profile updated.");

    setEditing(false);

  } catch (error) {
    console.error(error);
  }

};
  return (
    <div>

      <div className="flex justify-between items-center mb-6">

  <h1 className="text-3xl font-bold text-blue-900">
    My Profile
  </h1>

  {editing ? (

    <button
      onClick={saveProfile}
      className="bg-green-600 text-white px-5 py-2 rounded"
    >
      Save Changes
    </button>

  ) : (

    <button
      onClick={() => setEditing(true)}
      className="bg-blue-700 text-white px-5 py-2 rounded"
    >
      Edit Profile
    </button>

  )}

</div>

      <div className="bg-white rounded-lg shadow p-8 max-w-3xl">

        <div className="grid grid-cols-2 gap-6">

          <div>
            <label className="text-gray-500">
              First Name
            </label>

            {editing ? (
  <input
    value={profile.firstName}
    onChange={(e) =>
      setProfile({
        ...profile,
        firstName: e.target.value,
      })
    }
    className="border rounded p-2 w-full"
  />
) : (
  <p className="font-semibold text-lg">
    {profile.firstName}
  </p>
)}
          </div>

          <div>
            <label className="text-gray-500">
              Last Name
            </label>

            <p className="font-semibold text-lg">
              {profile.lastName}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Phone
            </label>

            <p className="font-semibold text-lg">
              {profile.phone}
            </p>
          </div>

          <div>
            <label className="text-gray-500">
              Role
            </label>

            <p className="font-semibold text-lg capitalize">
              {profile.role}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}