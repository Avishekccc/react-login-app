import axios from 'axios'
import { useEffect, useState } from 'react'
import { url } from '../../constant'
import { useNavigate } from 'react-router-dom'
// import profile_avatar from '../../assets/profile_avatar'
// import profile_avatar from ''

const AdminProfile = () => {
    let token = localStorage.getItem("token")
  let [profile, setProfile] = useState({})
  let navigate = useNavigate()
  
  const handelclick = () => {
  navigate("/admin/profile-update")
}
    
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
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Profile</h1>
          <p className="text-blue-100">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
              {/* Cover Image */}
              <div
                className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative"
                style={{
                  backgroundImage: `url(/placeholder.svg?height=200&width=400&text=Cover+Image)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/80 to-purple-600/80"></div>
                <div className="absolute top-4 right-4">
                  <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors duration-200">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Avatar Section */}
              <div className="relative px-6 pb-6">
                <div className="flex justify-center -mt-16 mb-4">
                  <div className="relative">
                    <img
                      src="../../../public/profile_avatar.jpg"
                      alt="Profile Avatar"
                      className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                    <button
                      // onClick={handleEditAvatar}
                      className="absolute bottom-2 right-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 shadow-lg"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">
                    {profile.fullName}
                  </h2>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {profile.role}
                  </span>
                </div>

                <button
                  onClick={handelclick}
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  Profile Information
                </h3>
                <button
                  onClick={handelclick}
                  className="p-2 text-gray-500 hover:text-blue-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Full Name
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {profile.fullName}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Email Address
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {profile.email}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Gender
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {profile.gender}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <label className="block text-sm font-medium text-gray-600 mb-1">
                      Date of Birth
                    </label>
                    <p className="text-lg font-semibold text-gray-800">
                      {new Date(profile.dob).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Account Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Account Status
                      </p>
                      <p className="text-sm font-semibold text-green-600">
                        Active
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm0 0v3m-3-3h6m-6 0H7a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v8a4 4 0 01-4 4h-3"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Member Since
                      </p>
                      <p className="text-sm font-semibold text-blue-600">
                        {new Date(profile.joinDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/admin/update-password")}
            className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Change Password
          </button>
          <button className="px-8 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors duration-200 shadow-lg">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminProfile