import React, { useState } from "react";
import { url } from "../../constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminUpdatePassword = () => {
  let [oldPassword, setOldPassword] = useState("");
  let [newPassword, setNewPassword] = useState("");
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  const handelSubmit = async (e) => {
    e.preventDefault();

    let data = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
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
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-[94vh] bg-gradient-to-br from-[#1B8AF1]  to-white   flex justify-center items-center">
      <div className="bg-slate-200 rounded-md px-[35px]  py-[30px] md:px-[35px] md:py-[50px] lg:py-[40px] shadow-lg shadow-blue-400">
        <form onSubmit={handelSubmit}>
          <h1 className="text-[28px] text-center font-semibold text-slate-500 underline mb-[20px]">
            Update Password
          </h1>
          <fieldset>
            <div className="space-y-[20px]">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="oldPassword"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  Old Password :{" "}
                </label>
                <input
                  className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                  type="password"
                  id="oldPassword"
                  placeholder="Enter Old Password"
                  value={oldPassword}
                  onChange={(e) => {
                    // console.log(e.target.value)
                    setOldPassword(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="newPassword"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  New Password :{" "}
                </label>
                <input
                  className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                  type="password"
                  id="newPassword"
                  placeholder="Enter New Password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </fieldset>
          <div className="flex justify-center items-center cursor-pointer mt-[35px] p-[5px]">
            <div className="inline-block py-[8px] px-[20px] bg-blue-500 active:bg-blue-800  rounded-lg">
              <button style={{ cursor: "pointer" }} type="submit">
                Update Password
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdatePassword;
