import React, { useState } from "react";
import { url } from "../../constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalVariableContext } from "../../App";

const AdminLogin = () => {
  let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
  let navigate = useNavigate()
  
    let global = useContext(GlobalVariableContext);

  const handelSubmit = async (e) => {
    e.preventDefault();

    let data = {
      email: email,
      password: password,
    };

    try {
      let result = await axios({
        url: `${url}/web-Users/login`,
        method: "post",
        data: data,
      });
        // console.log(result)
        
        let token = result.data.token
        // console.log(token)
      localStorage.setItem("token", token)
      global.setToken(token)
        
        navigate("/admin")


    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="h-[95vh] bg-gradient-to-br from-[#1B8AF1]  to-white   flex justify-center items-center">
        <div className=" bg-slate-200 rounded-md px-[35px]  py-[30px] md:px-[35px] md:py-[50px] lg:py-[40px] shadow-lg shadow-blue-400">
          <h1 className="text-[28px] text-center font-semibold text-slate-500 underline mb-[20px] ">
            Admin Login
          </h1>
          <form onSubmit={handelSubmit}>
            <div className="w-[230px] md:w-[300px] lg:w-[240px]">
              <fieldset>
                <div className="space-y-[20px]">
                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="email"
                      className="text-[22px] lg:text-[18px] text-slate-800"
                    >
                      Email
                    </label>
                    <input
                      className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                      type="email"
                      id="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => {
                        // console.log(e.target.value)
                        setEmail(e.target.value);
                      }}
                    />
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label
                      htmlFor="password"
                      className="text-[22px] lg:text-[18px] text-slate-800"
                    >
                      Password{" "}
                    </label>
                    <input
                      className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                      type="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        // console.log(e.target.value)
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="space-y-[15px] mt-[20px]">
              <div className=" flex justify-center cursor-pointer">
                <div className=" inline-block py-[8px] px-[20px] bg-blue-500 active:to-blue-700 rounded-lg">
                  <button type="submit" className="text-white/80">
                    Login
                  </button>
                </div>
              </div>

              <div
                className="text-center text-blue-800 cursor-pointer"
                onClick={(e) => {
                  navigate("/admin/forgot-password");
                }}
              >
                Forgot Password
              </div>
            </div>
          </form>
        </div>
    </div>
  );
};

export default AdminLogin;
