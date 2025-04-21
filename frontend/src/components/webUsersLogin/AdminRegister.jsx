import React, { useState } from 'react'
import { url } from '../../constant';
import axios from "axios";
import { toast } from 'react-toastify';


const AdminRegister = () => {
  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("male");
  let [loading, setLoading] = useState(false); 

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {
      fullName: fullName,
      dob: dob,
      email: email,
      password: password,
      gender,
    };

    data = {
      ...data,
      role: "admin",
    };

    // console.log(data.fullName);
    // console.log(data.dob);
    // console.log(data.email);
    // console.log(data.password);
    // console.log(data.gender);

    try {
      await axios({
        url: `${url}/web-Users`,
        method: "post",
        data: data,
      });

      // console.log(result)
      toast.success(
        "A link has been sent to your Email. Please click the Given link to verify your account."
      );

      setFullName("");
      setDob("");
      setEmail("");
      setPassword("");
      setGender("male");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // stop loading
    }
  };

  let genderOption = [
    {
      label: "Male",
      value: "male",
    },
    {
      label: "Female",
      value: "female",
    },
    {
      label: "Other",
      value: "other",
    },
  ];
  return (
    <div className="h-[94vh] bg-gradient-to-br from-[#1B8AF1]  to-white   flex justify-center items-center">
      <div className=" bg-slate-200 rounded-md px-[35px]  py-[30px] md:px-[35px] md:py-[50px] lg:py-[35px] shadow-lg shadow-blue-400">
        <h1 className="text-[28px] text-center font-semibold text-slate-500 underline mb-[20px]">
          Admin Registration
        </h1>
        <form onSubmit={handelSubmit}>
          <fieldset>
            <div className="space-y-[15px]">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="fullName"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  FullName{" "}
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="fullname"
                  className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                  value={fullName}
                  onChange={(e) => {
                    // console.log(e.target.value)
                    setFullName(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  Email{" "}
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

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="password"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  Password{" "}
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                  value={password}
                  onChange={(e) => {
                    // console.log(e.target.value)
                    setPassword(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="dob"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="dob"
                  className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </div>

              <div className=" space-x-4">
                <label
                  htmlFor="male"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  Gender :{" "}
                </label>
                {genderOption.map((item, i) => {
                  return (
                    <span key={i}>
                      <input
                        type="radio"
                        id={item.value}
                        value={item.value}
                        checked={gender === item.value}
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                      />
                      <label htmlFor={item.value}>{item.label}</label>
                    </span>
                  );
                })}
              </div>
            </div>
          </fieldset>
          <div className="text-center py-[8px] px-[20px] mt-[30px] bg-blue-500 active:bg-blue-800 rounded-lg cursor-pointer">
            <button
              type="submit"
              disabled={loading}
              className="text-white flex justify-center items-center gap-2 w-[250px] md:w-[250px] lg:w-[230px]"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister



/* 
{
   fullName,setFullName,email,setEmail,gender,setGender,
} */