"use client";

import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";
import api from "@/lib/api";

export default function SettingsPage() {
    const [editingUser, setEditingUser] =
        useState<any>(null);
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);


  // User Management modal state

   const [showUsers, setShowUsers] =
     useState(false);
   const [showCreateModal, setShowCreateModal] =
useState(false);

const [firstName, setFirstName] =
useState("");

const [lastName, setLastName] =
useState("");

const [phone, setPhone] =
useState("");

const [password, setPassword] =
useState("");

const [role, setRole] =
useState("admin");

     const loadUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(response.data);
  } catch (error) {
    console.error(error);
  }
};

const saveUser = async () => {

  const token =
    localStorage.getItem("token");

  if (editingUser) {

    await api.put(

      `/users/${editingUser.id}`,

      {
        firstName,
        lastName,
        phone,
        role,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

  } else {

    await api.post(

      "/users",

      {
        firstName,
        lastName,
        phone,
        password,
        role,
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

    );

  }

  loadUsers();

  setEditingUser(null);

  setShowCreateModal(false);

  setFirstName("");

  setLastName("");

  setPhone("");

  setPassword("");

  setRole("admin");

};

const deleteUser = async (
  id: number,
) => {

  if (
    !confirm(
      "Delete this user?"
    )
  ) return;

  const token =
    localStorage.getItem("token");

  await api.delete(
    `/users/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  loadUsers();

};
useEffect(() => {
  if (showUsers) {
    loadUsers();
  }
}, [showUsers]);
     
  return (
    <div>

      <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6 md:mb-8">
        Settings
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">

        {/* Profile */}

        <div
          onClick={() =>
            router.push("/profile")
          }
          className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">
            👤 My Profile
          </h2>

          <p className="text-gray-500 mt-2">
            View and edit your personal information.
          </p>
        </div>

        {/* Password */}

        <div
          onClick={() =>
            router.push("/change-password")
          }
          className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">
            🔒 Change Password
          </h2>

          <p className="text-gray-500 mt-2">
            Update your account password.
          </p>
        </div>

        {/* Users */}

        <div
           onClick={() =>
           setShowUsers(true)
          }
          className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">
            👥 User Management
          </h2>

          <p className="text-gray-500 mt-2">
            Create, edit and manage users.
          </p>

          
        </div>

        {/* Roles */}

        <div
          onClick={() => setShowUsers(true)
          }
          className="bg-white shadow rounded-lg p-6 cursor-pointer hover:shadow-lg transition"
        >
          <h2 className="text-xl font-semibold">
            🛡 Role Management
          </h2>

          <p className="text-gray-500 mt-2">
            Manage administrator roles and permissions.
          </p>
        </div>

      </div>
       {/* =========================
    USER MANAGEMENT
========================= */}

{showUsers && (
  <div className="mt-8 bg-white shadow rounded-lg overflow-hidden">

    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 p-4 border-b">

      <h2 className="font-semibold text-lg">
        User Management
      </h2>

      <button
      onClick={() => setShowCreateModal(true)}
        className="bg-blue-700 text-white px-4 py-2 rounded cursor-pointer w-full sm:w-auto"
      >
        + Create New User
      </button>

    </div>
     <div className="overflow-x-auto">
    <table className="min-w-[700px] w-full">

      <thead>

        <tr className="bg-gray-100">

          <th className="p-3 py-2 text-left whitespace-nowrap">
            First Name
          </th>

          <th className="p-3 py-2 text-left whitespace-nowrap">
            Last Name
          </th>

          <th className="p-3 py-2 text-left whitespace-nowrap">
            Phone
          </th>

          <th className="p-3 py-2 text-left whitespace-nowrap">
            Role
          </th>

          <th className="p-3 py-2 text-left whitespace-nowrap">
            Actions
          </th>

        </tr>

      </thead>

      <tbody>

  {users.length === 0 ? (

    <tr>

      <td
        colSpan={5}
        className="text-center p-8 text-gray-500"
      >
        No users found.
      </td>

    </tr>

  ) : (

    users.map((user: any) => (

      <tr
        key={user.id}
        className="border-t"
      >

        <td className="px-3 py-2 whitespace-nowrap">
          {user.firstName}
        </td>

        <td className="px-3 py-2 whitespace-nowrap">
          {user.lastName}
        </td>

        <td className="px-3 py-2 whitespace-nowrap">
          {user.phone}
        </td>

        <td className="px-3 py-2 whitespace-nowrap">
          {user.role}
        </td>

        <td className="px-3 py-2 whitespace-nowrap">
         <div className="flex gap-2">
          <button
  onClick={() => {

    setEditingUser(user);

    setFirstName(user.firstName);

    setLastName(user.lastName);

    setPhone(user.phone);

    setRole(user.role);

    setPassword("");

    setShowCreateModal(true);

  }}
  className="text-blue-700 cursor-pointer"
>
  Edit
</button>

          <button
  onClick={() =>
    deleteUser(user.id)
  }
  className="text-red-600 cursor-pointer"
>
  Delete
</button>
</div>
        </td>

      </tr>

    ))

  )}

</tbody>

</table>
</div>
</div>
)}

{showCreateModal && (

<div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">

<div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">

<h2 className="text-xl font-bold mb-6">
{editingUser
 ? "Edit User"
 : "Create User"}
</h2>

<input
placeholder="First Name"
value={firstName}
onChange={(e)=>setFirstName(e.target.value)}
className="border rounded p-3 w-full mb-3"
/>

<input
placeholder="Last Name"
value={lastName}
onChange={(e)=>setLastName(e.target.value)}
className="border rounded p-3 w-full mb-3"
/>

<input
placeholder="Phone"
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="border rounded p-3 w-full mb-3"
/>

{!editingUser && (
  <input
    type="password"
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="border rounded p-3 w-full mb-3"
  />
)}

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
className="border rounded p-3 w-full mb-6"
>

<option value="admin">
Administrator
</option>

<option value="operator">
Operator
</option>

</select>

<div className="flex flex-col sm:flex-row justify-end gap-3">

<button
onClick={() => {
  setShowCreateModal(false);
  setEditingUser(null);
  setFirstName("");
  setLastName("");
  setPhone("");
  setPassword("");
  setRole("admin");
}}
className="px-4 py-2 bg-gray-500 text-white rounded w-full sm:w-auto"
>
Cancel
</button>

<button
onClick={saveUser}
className="px-4 py-2 bg-blue-700 text-white rounded w-full sm:w-auto"
>
{editingUser
 ? "Update User"
 : "Save User"}
</button>

</div>

</div>

</div>

)}
</div>
  );
}