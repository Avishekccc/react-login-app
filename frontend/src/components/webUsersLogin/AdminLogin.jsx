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
  let [loading, setLoading] = useState(false); // loader state

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
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="min-h-screen grid grid-rows-2 lg:grid-rows-1 lg:grid-cols-2 max-w-7xl mx-auto">
        {/* IMAGE SECTION */}
        <section className="relative flex flex-col justify-center items-center p-4 lg:p-8 bg-white/60 backdrop-blur-sm">
          <div className="text-center mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-4xl font-bold text-green-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-green-600 text-sm lg:text-base">
              Sign in to continue your journey
            </p>
          </div>

          <div className="relative w-full max-w-md lg:max-w-md h-64 lg:h-96">
            <picture className="block w-full h-full">
              <source srcSet={loginIllustration} media="(min-width: 1024px)" />
              <img
                src={loginIllustration_Mbl}
                alt="Login illustration"
                fill
                className="object-cover"
                priority
              />
            </picture>
          </div>
        </section>

        {/* FORM SECTION */}
        <section className="flex justify-center items-center p-4 lg:p-8 bg-gradient-to-br from-green-100 to-green-200">
          <div className="w-full max-w-md">
            <form
              onSubmit={handelSubmit}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8 space-y-6 border border-green-200/50"
            >
              <div className="text-center mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-700 mb-2">
                  Let's Join Us
                </h2>
                <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="example@gmail.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm placeholder-gray-400"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                {loading ? (
                  <div className="flex justify-center items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Forgot your password?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/auth/forgot-password")}
                      className="font-medium text-green-600 text-sm hover:text-green-700 underline underline-offset-2 transition-colors duration-200"
                    >
                      Reset here
                    </button>
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/auth/register")}
                      className="font-semibold text-sm text-green-600 hover:text-green-700 transition-colors duration-200"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminLogin;
