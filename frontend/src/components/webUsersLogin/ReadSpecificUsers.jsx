import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { url } from "../../constant";
import { useState } from "react";

const ReadSpecificUsers = () => {
  let params = useParams();
  let [data, setData] = useState({});

  const getData = async () => {
    try {
      let result = await axios({
        url: `${url}/web-users/${params.id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(result)

      setData(result.data.result);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="h-[95vh] bg-gradient-to-br from-[#1B8AF1]  to-white   flex justify-center ">
      <div className="h-[300px] w-[350px] bg-white/50 mt-[50px] rounded-lg shadow-lg shadow-blue-500 p-[8px]  space-y-6 border-blue-300 ">
        <div className="border-2 rounded-lg h-full p-2">
          <p className="text-center text-4xl "> {data.fullName}</p>
          <div className="space-y-5">
            <h2 className="underline font-semibold ">Personal Info</h2>
            <div className="space-y-3">
              <p>Email: {data.email}</p>
              <p>Date Of Birth: {new Date(data.dob).toLocaleDateString()} </p>
              <p> Gender: {data.gender}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadSpecificUsers;
