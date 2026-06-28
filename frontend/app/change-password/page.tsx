"use client";

import { useState } from "react";
import api from "@/lib/api";

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const changePassword = async () => {
    if (
      newPassword !== confirmPassword
    ) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const response =
        await api.post(
          "/users/change-password",
          {
            oldPassword,
            newPassword,
          },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      alert(response.data.message);

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>

      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Change Password
      </h1>

      <div className="bg-white rounded-lg shadow p-8 max-w-lg">

        <div className="space-y-5">

          <input
            type="password"
            placeholder="Current Password"
            value={oldPassword}
            onChange={(e) =>
              setOldPassword(e.target.value)
            }
            className="border rounded p-3 w-full"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="border rounded p-3 w-full"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="border rounded p-3 w-full"
          />

          <button
            onClick={changePassword}
            disabled={loading}
            className="bg-blue-700 text-white px-6 py-3 rounded"
          >
            {loading
              ? "Updating..."
              : "Update Password"}
          </button>

        </div>

      </div>

    </div>
  );
}