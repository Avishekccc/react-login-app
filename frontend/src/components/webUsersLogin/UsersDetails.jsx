import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { url } from "../../constant";
import Swal from "sweetalert2";



const UsersDetails = ({ item, getData }) => {
  let navigate = useNavigate();
  const handleView = (id) => {
    return (e) => {
      navigate(`/admin/${item._id}`);
    };
  };

  const handleDelete = (id) => {
    return async (e) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            let result = await axios({
              url: `${url}/web-users/${item._id}`,
              method: "delete",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            getData();
            toast.success(result.data.message);
          } catch (error) {
            toast.error(error.response.data.message);
          }
        }
      });
    };
  };

  const handelUpdate = (id) => {
    return (e) => {
      navigate(`/admin/update/${item._id}`);
    };
  };

  

  return (
    // <tr>
    //   <td className="border border-gray-500 px-4 py-2">{item.fullName}</td>
    //   <td className="border border-gray-500 px-4 py-2">{item.email}</td>
    //   <td className="border border-gray-500 px-4 py-2">{item.gender}</td>

    //   <td className="border border-gray-500 px-4 py-2">
    //     {new Date(item.dob).toLocaleDateString()}
    //   </td>
    //   <td className="border border-gray-500 px-4 py-2">
    //     <div className="flex space-x-[15px] ">
    //       <div className="  bg-green-500 py-[5px] px-[10px] rounded-lg text-white/90">
    //         <button onClick={handleView(item._id)}>View</button>
    //       </div>

    //       <div className="bg-blue-400 py-[5px] px-[10px] rounded-lg text-white/90">
    //         <button onClick={handelUpdate(item._id)}>Update</button>
    //       </div>
    //       <div className="bg-red-400 py-[5px] px-[10px] rounded-lg text-white/90">
    //         <button onClick={handleDelete(item._id)}>Delete</button>
    //       </div>
    //     </div>
    //   </td>
    // </tr>

    <>
      {/* ✅ Desktop/Tablet Table Row */}
      <tr className="hidden md:table-row">
        <td className="border border-gray-500 px-4 py-2">{item.fullName}</td>
        <td className="border border-gray-500 px-4 py-2">{item.email}</td>
        <td className="border border-gray-500 px-4 py-2">{item.gender}</td>
        <td className="border border-gray-500 px-4 py-2">
          {new Date(item.dob).toLocaleDateString()}
        </td>
        <td className="border border-gray-500 px-4 py-2">
          <div className="flex space-x-3">
            <button
              onClick={handleView(item._id)}
              className="bg-green-500 py-1 px-3 rounded-lg text-white"
            >
              View
            </button>
            <button
              onClick={handelUpdate(item._id)}
              className="bg-blue-400 py-1 px-3 rounded-lg text-white"
            >
              Update
            </button>
            <button
              onClick={handleDelete(item._id)}
              className="bg-red-400 py-1 px-3 rounded-lg text-white"
            >
              Delete
            </button>
          </div>
        </td>
      </tr>

      {/* ✅ Mobile Card View */}
     
        <div className="md:hidden bg-white p-4 rounded-lg shadow mb-4">
          <p>
            <span className="font-semibold">Full Name:</span> {item.fullName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {item.email}
          </p>
          <p>
            <span className="font-semibold">Gender:</span> {item.gender}
          </p>
          <p>
            <span className="font-semibold">DOB:</span>{" "}
            {new Date(item.dob).toLocaleDateString()}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <button
              onClick={handleView(item._id)}
              className="bg-green-500 py-1 px-3 rounded-lg text-white"
            >
              View
            </button>
            <button
              onClick={handelUpdate(item._id)}
              className="bg-blue-400 py-1 px-3 rounded-lg text-white"
            >
              Update
            </button>
            <button
              onClick={handleDelete(item._id)}
              className="bg-red-400 py-1 px-3 rounded-lg text-white"
            >
              Delete
            </button>
          </div>
        </div>
      
    </>
  );
};

export default UsersDetails;
