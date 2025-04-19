import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { url } from "../../constant";
// REACT_APP_API_KEY = 1234567890;

const AdminForgotPassword = () => {
  let [email, setEmail] = useState("");
  let token = localStorage.getItem("token");

  const handelSubmit = async (e) => {
    e.preventDefault();

    let data = {
      email: email,
    };

    try {
       await axios({
        url: `${url}/web-Users/forgot-password`,
        method: "post",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
        setEmail("")
       toast.success(
         "A link has been sent to your Email. Please click the Given link to reset your password."
       );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="h-[95vh] bg-gradient-to-br from-[#1B8AF1]  to-white   flex justify-center items-center">
      <div>
        <h1 className="text-[28px] text-center font-semibold text-slate-500 underline mb-[20px]">
          Forgot Password
        </h1>
        <div className=" bg-slate-200 rounded-md px-[35px]  py-[30px] md:px-[35px] md:py-[50px] lg:py-[20px] lg:px-[20px] shadow-lg shadow-blue-400">
          <form onSubmit={handelSubmit}>
            <fieldset>
              <div className="flex flex-col space-y-2 w-[300px]">
                <label
                  htmlFor="email"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="email"
                  className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                  value={email}
                  onChange={(e) => {
                    // console.log(e.target.value)
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </fieldset>
            <p className="text-[10px] text-red-500 mt-[5px]">
              An email will be sent to your inbox. Please verify!
            </p>
            <div className=" inline-block py-[7px] px-[25px] mt-[15px] bg-blue-500 rounded-lg">
              <button style={{ cursor: "pointer" }} type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
