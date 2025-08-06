import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { url } from "../../constant";
import forgotPasswordIllustration from '../../assets/Forgot-password.gif'
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
// REACT_APP_API_KEY = 1234567890;

const AdminForgotPassword = () => {
  let [email, setEmail] = useState("");
  let token = localStorage.getItem("token");
  let [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)

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
      setEmail("");
      toast.success(
        "A link has been sent to your Email. Please click the Given link to reset your password."
      );
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // stop loader
    }
  };

  return (
    <main className="h-screen grid grid-rows-2 lg:grid-cols-2 bg-white/50 ">
      <section className=" max-h-screen lg:h-screen flex justify-center items-center">
        <img
          src={forgotPasswordIllustration}
          alt="forgot-Password-Illustration"
          className="h-full max-h-[500px] w-auto object-cover"
        />
      </section>
      {/* Forgot-Password-Form */}
      <section className=" max-h-screen lg:h-screen flex justify-center lg:items-center bg-green-100">
        <form
          onSubmit={handelSubmit}
          className="w-full max-w-md px-4 pt-4 md:px-10 space-y-5"
        >
          <div className="">
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-600">
              Forgot password
            </h1>
            <p>
              Enter your email and we'll send you link to reset your password.
            </p>
          </div>

          <label className="block">
            <span className="block text-gray-700">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="example@gmail.com"
              className="w-full border p-2 rounded "
            />
          </label>

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
              "Send"
            )}
          </button>

          <div className="text-center w-full flex justify-center  text-green-700 ">
            
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-green-700 font-semibold text-sm flex   items-center"
              >
                <IoIosArrowBack /> Back to login
             
              </button>
            
          </div>
        </form>
      </section>
    </main>
  );
};

export default AdminForgotPassword;
