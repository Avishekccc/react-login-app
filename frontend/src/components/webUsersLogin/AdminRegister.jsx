import React, { useState } from 'react'
import { url } from '../../constant';
import axios from "axios";
import { toast } from 'react-toastify';
import singupgif from "../../assets/singup-gif.gif";
import { useNavigate } from 'react-router-dom';



const AdminRegister = () => {
  let [fullName, setFullName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [dob, setDob] = useState("");
  let [gender, setGender] = useState("male");
  let [loading, setLoading] = useState(false); 
  let navigate = useNavigate();

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

    try {
      await axios({
        url: `${url}/web-Users`,
        method: "post",
        data: data,
      });

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
    <main className="h-screen lg:max-h-screen grid grid-rows-2 lg:grid-cols-2 bg-white/80">
         <section className="h-[250px] md:h-[350px] lg:h-screen flex justify-center items-center">
           <div className="">
             <img
               src={singupgif}
               alt="singup illustration"
               className=" max-h-[250px] md:max-h-[350px] lg:max-h-[500px]  w-auto object-contain"
             />
           </div>
         </section>
         <section className="h-[300px] md:h-[450px] lg:h-screen flex justify-center items-center px-4 md:px-10">
           <form
             onSubmit={handelSubmit}
             className="w-full max-w-md space-y-6 bg-white rounded-md p-6 md:p-10"
           >
             <h1 className="text-2xl md:text-3xl font-semibold text-slate-600">
               Create Account
             </h1>
   
             <div className="space-y-4">
               <label className="block">
                 <span className="block text-gray-700">FullName</span>
                 <input
                   type="text"
                   id="fullName"
                   placeholder="Jay Shankar"
                   value={fullName}
                   onChange={(e) => {
                     setFullName(e.target.value);
                   }}
                   className="w-full border p-2 rounded"
                 />
               </label>
               <label className="block">
                 <span className="block text-gray-700">Email</span>
                 <input
                   type="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="example@gmail.com"
                   className="w-full border p-2 rounded"
                 />
               </label>
               <label className="block">
                 <span className="block text-gray-700">Password</span>
                 <input
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="********"
                   className="w-full border p-2 rounded"
                 />
               </label>
               <label className="block">
                 <span className="block text-gray-700">Date Of Birth</span>
                 <input
                   type="date"
                   id="dob"
                   value={dob}
                   onChange={(e) => {
                     setDob(e.target.value);
                   }}
                   placeholder="example@gmail.com"
                   className="w-full border p-2 rounded"
                 />
               </label>
   
               <label className="flex gap-4">
                 <span className="block text-gray-700">Gender : </span>
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
               </label>
             </div>
   
             <button
               type="submit"
               disabled={loading}
               className="w-full py-2 bg-green-500 text-lg text-gray-300 rounded shadow-md hover:bg-green-600  active:bg-green-600"
             >
               {loading ? (
                 <div className="flex justify-center items-center gap-1">
                   <svg
                     className="animate-spin h-4 w-4 text-green-800"
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
                   Loding...
                 </div>
               ) : (
                 "Sing Up"
               )}
             </button>
   
             <div className="text-center">
               <p className="text-sm text-green-700">
                 Already have an account?{" "}
                 <button
                   type="button"
                   onClick={() => navigate("/admin/login")}
                   className="text-green-700 font-semibold text-sm"
                 >
                   Sign In
                 </button>
               </p>
             </div>
           </form>
         </section>
       </main>
  );
}

export default AdminRegister



/* 
{
   fullName,setFullName,email,setEmail,gender,setGender,
} */