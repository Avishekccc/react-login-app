import React, { useState } from "react";
import { url } from "../../constant";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalVariableContext } from "../../App";
import loginIllustration from "../../assets/login_illustration.jpg";
import loginIllustration_Mbl from "../../assets/login_mbl_view_illustration.jpg";


const AdminLogin = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);// loader state
  let [isActive,setIsActive] = useState(false)

  let navigate = useNavigate();

  let global = useContext(GlobalVariableContext);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loader

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

      let token = result.data.token;
      // console.log(token)
      localStorage.setItem("token", token);
      global.setToken(token);

      navigate("/admin");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false); // stop loader
    }
  };
  return (
    <main className="lg:max-h-screen grid grid-rows-2 lg:grid-cols-2 bg-white/80">
      {/* IMAGE SECTION */}
      <section className=" lg:h-screen flex justify-center items-center ">
        <picture className="h-full max-h-[500px] w-auto">
          <source srcSet={loginIllustration} media="(min-width: 1024px)" />
          <img
            src={loginIllustration_Mbl}
            alt="login illustration"
            className=" max-h-[500px] w-auto object-contain"
          />
        </picture>
      </section>

      {/* FORM SECTION */}
      <section className="lg:h-screen flex justify-center items-center px-4 md:px-10 ">
        <form
          onSubmit={handelSubmit}
          className="w-full max-w-md space-y-6 bg-white rounded-md p-6 md:p-10"
        >
          <h1 className="text-2xl md:text-3xl font-semibold text-slate-600">
            Let's Join Us
          </h1>

          <div className="space-y-4">
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
              "Sing In"
            )}
          </button>

          <div className="text-center text-green-700">
            <p className="text-sm">
              Forgot your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/admin/forgot-password")}
                className="underline font-medium text-sm text-green-700"
              >
                Reset
              </button>
            </p>
          </div>

          <div className="text-center">
            <p className="text-sm text-green-700">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/admin/register")}
                className="text-green-700 font-semibold text-sm"
              >
                Sign Up
              </button>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default AdminLogin;
