import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { url } from '../../constant'
import { useNavigate } from 'react-router-dom'
import bgimage from '../../assets/profile-background-b5vedq7mz8mjvslu.jpg'

const AdminProfile = () => {
    let token = localStorage.getItem("token")
  let [profile, setProfile] = useState({})
  let navigate = useNavigate()
  
  const handelclick = () => {
  navigate("/admin/profile-update")
}
    
    // let getAdminProfile = async () => {
    //     try {
    //         let result = await axios({
    //             url: `${url}/web-Users/my-profile`,
    //             method: "get",
    //             headers: {
    //                 Authorization:`Bearer ${token}`
    //             }
    //         });
    //         // console.log(result)
    //         setProfile(result.data.result)
    //     } catch (error) { }
    // }

    // useEffect(() => {
    //   getAdminProfile();
  // }, [getAdminProfile]);
  useEffect(() => {
    const getAdminProfile = async () => {
      try {
        let result = await axios({
          url: `${url}/web-Users/my-profile`,
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(result.data.result);
      } catch (error) {
        // handle error
      }
    };

    getAdminProfile();
  }, [token]);
  return (
    <div className="h-[95vh] bg-gradient-to-br from-[#1B8AF1]  to-white   flex justify-center   ">
      <div className="">
        <div className="h-[500px] w-[350px] bg-white/30 mt-[50px] rounded-lg shadow-lg shadow-blue-500 border-2 ">
          <div
            className=" h-[200px] bg-cover rounded-t-lg "
            style={{ backgroundImage: `url(${bgimage})` }}
          >
            {/* <p className="text-4xl text-white/80 text-center">
              {" "}
              {profile.role}
            </p> */}
          </div>
          <div className="space-y-[10px] p-[10px] text-lg font-semibold">
            <p>Full Name : {profile.fullName}</p>
            <p>Role :  {profile.role}</p>
            <p>Email : {profile.email}</p>

            <p>Gender : {profile.gender}</p>
            <p>Date of Birth : {new Date(profile.dob).toLocaleDateString()}</p>
          </div>
          <div className="flex  cursor-pointer mt-[25px] p-[10px]">
            <div className="inline-block py-[8px] px-[20px] bg-blue-500 active:to-blue-700 rounded-lg">
              <button onClick={handelclick}>
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile