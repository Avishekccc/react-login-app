import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { url } from "../../constant";

const AdminVerify = () => {
  let [query] = useSearchParams()
  let token = query.get("token")
  // console.log(token)
  let navigate = useNavigate()

  
  useEffect(() => {
    let verifyEmail = async () => {
      try {
       await axios({
         url: `${url}/web-users/verify-email`,
         method: "patch",
         headers: {
           Authorization: `Bearer ${token}`,
         },
       });
        navigate("/admin/login");
      } catch (error) {}
    };
    verifyEmail();
  }, [token, navigate]);

  return <div>AdminVerify</div>;
};

export default AdminVerify;
