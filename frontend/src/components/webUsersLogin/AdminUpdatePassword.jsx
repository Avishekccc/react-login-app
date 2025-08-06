import React, { useState } from "react";
import { url } from "../../constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminUpdatePassword = () => {
  let [oldPassword, setOldPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
    let [loading, setLoading] = useState(false); 
  
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  const handelSubmit = async (e) => {
    e.preventDefault();

    let data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      setLoading(true)
       await axios({
        url: `${url}/web-Users/update-password`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
localStorage.removeItem("token")
      // console.log(result)
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-white flex justify-center items-center p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-xl px-8 py-10 md:px-12 md:py-12 shadow-2xl shadow-blue-400/30 w-full max-w-md">
        <form onSubmit={handelSubmit} className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-700 mb-2">
              Update Password
            </h1>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-lg font-medium text-slate-700 mb-2"
              >
                Old Password
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                type="password"
                id="oldPassword"
                placeholder="Enter your current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-lg font-medium text-slate-700 mb-2"
              >
                New Password
              </label>
              <input
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                type="password"
                id="newPassword"
                placeholder="Enter your new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Updating...
              </div>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdatePassword;
