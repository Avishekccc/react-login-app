import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { url } from "../../constant";

const AdminResetPassword = () => {
  let [password, setPassword] = useState("");
    let navigate = useNavigate();
    let [params] = useSearchParams()
    let token = params.get("token")
//   let token = localStorage.getItem("token");

  const handelSubmit = async (e) => {
    e.preventDefault();

    let data = {
      password: password,
    };

    try {
       await axios({
        url: `${url}/web-Users/reset-password`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/admin/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-[94vh] bg-gradient-to-br from-[#1B8AF1]  to-white   flex justify-center items-center">
      <div className=" bg-slate-200 rounded-md px-[35px]  py-[30px] md:px-[35px] md:py-[50px] lg:py-[40px] shadow-lg shadow-blue-400">
        <form onSubmit={handelSubmit}>
          <h1>Reset Profile</h1>
          <fieldset>
            <div>
              <label htmlFor="password">New Password : </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </fieldset>
          <button style={{ cursor: "pointer" }} type="submit">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminResetPassword;
