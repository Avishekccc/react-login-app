import React, { useEffect, useState } from "react";
import { url } from "../../constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import htmlDateFormat from "../../utils/dateFormat";

const UpdateSpecificUsers = () => {
  let [fullName, setFullName] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("male");
  let navigate = useNavigate();
  let token = localStorage.getItem("token");
let params = useParams()

  const handelSubmit = async (e) => {
    e.preventDefault();

    let data = {
      fullName: fullName,
      dob: dob,
      gender,
    };

    try {
      let result = await axios({
        url: `${url}/web-Users/${params.id}`,
        method: "patch",
        data: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(result)
      navigate(`/admin/${params.id}`);
    } catch (error) {
      toast.error(error.response.data.message);
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

  let getAdminUser = async () => {
    try {
      let result = await axios({
        url: `${url}/web-Users/${params.id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let _data = result.data.result;

      setFullName(_data.fullName);
      setDob(htmlDateFormat(_data.dob));
      setGender(_data.gender);
    } catch (error) {}
  };

  useEffect(() => {
    getAdminUser();
  }, []);
  return (
    <div className="h-[95vh] bg-gradient-to-br from-[#1B8AF1]  to-white   flex justify-center items-center">
      <div className="bg-slate-200 rounded-md px-[35px]  py-[30px] md:px-[35px] md:py-[50px] lg:py-[40px] shadow-lg shadow-blue-400">
        <form onSubmit={handelSubmit}>
          <h1 className="text-[28px] text-center font-semibold text-slate-500 underline mb-[20px]">
            Update User
          </h1>
          <fieldset>
            <div className="space-y-[20px]">
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="fullName"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  FullName :{" "}
                </label>
                <input
                  className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => {
                    // console.log(e.target.value)
                    setFullName(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="dob"
                  className="text-[22px] lg:text-[18px] text-slate-800"
                >
                  D.O.B :{" "}
                </label>
                <input
                  className="p-[8px] md:p-[12px] lg:p-[8px] outline-none rounded-lg"
                  type="date"
                  id="dob"
                  value={dob}
                  onChange={(e) => {
                    setDob(e.target.value);
                  }}
                />
              </div>

              <div className="space-x-4">
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
          <div className="flex  cursor-pointer mt-[35px] p-[5px]">
            <div className=" py-[8px] px-[20px] bg-blue-500 active:to-blue-700 rounded-lg">
              <button style={{ cursor: "pointer" }} type="submit">
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSpecificUsers;

