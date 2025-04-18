import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../constant";
import UsersDetails from "./UsersDetails";

const ReadAllUser = () => {
  let [users, setUsers] = useState([]);

  /* 
  hit api on page load
  it gives data
  set data to users
  */
  const getData = async () => {
    try {
      let result = await axios({
        url: `${url}/web-Users`,
        method: "get",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(result);
      setUsers(result.data.result);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col h-[95vh] bg-gradient-to-br from-[#1B8AF1] to-white ">
      <div className="m-[5%] overflow-y-scroll ">
        <h2 className="text-2xl font-bold mb-4">User List</h2>

        {/* ✅ Table for Desktop/Tablet */}
        <table className="table-auto border border-collapse w-full hidden md:table ">
          <thead className="bg-gray-400 ">
            <tr>
              <th className="border border-gray-500 border-r-1 text-left px-4 py-2">
                Full Name
              </th>
              <th className="border border-gray-500 text-left px-4 py-2">
                Email
              </th>
              <th className="border border-gray-500 text-left px-4 py-2">
                Gender
              </th>
              <th className="border border-gray-500 text-left px-4 py-2">
                DOB
              </th>
              <th className="border border-gray-500 text-left px-4 py-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((item, i) => {
              return (
                <UsersDetails
                  item={item}
                  key={item._id}
                  getData={getData}
                ></UsersDetails>
              );
            })}
          </tbody>
        </table>

        {/* ✅ Card List for Mobile */}
        <div className="md:hidden flex flex-col gap-4">
          {users.map((item, i) => {
            return (
              <UsersDetails
                item={item}
                key={item._id}
                getData={getData}
              ></UsersDetails>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ReadAllUser;
