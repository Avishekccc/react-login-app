import React, { useState } from "react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalVariableContext } from "../../App";
// import MyLink from "../../dashboard/MyLink";




const NavLinks = () => {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(isOpen)

  

  let global = useContext(GlobalVariableContext);
  // console.log(global)
  
  return (
    <div className="bg-green-500 bg-opacity-100 mx-4 flex justify-between items-center px-7 relative">
      <h1 className="text-lg font-bold text-blue-700">Login System</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {global.token ? (
          <>
            <NavLink
              to="/admin/my-profile"
              className="text-blue-500 hover:text-blue-700"
            >
              My Profile
            </NavLink>
            <NavLink
              to="/admin/update-password"
              className="text-blue-500 hover:text-blue-700"
            >
              Update Password
            </NavLink>
            <NavLink
              to="/admin/read-all-user"
              className="text-blue-500 hover:text-blue-700"
            >
              Read All User
            </NavLink>
            <NavLink
              to="/admin/logout"
              className="text-blue-500 hover:text-blue-700"
            >
              Logout
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/admin/login"
              className="text-blue-600 hover:text-blue-700"
            >
              Admin Login
            </NavLink>
            <NavLink
              to="/admin/register"
              className="text-blue-600 hover:text-blue-700"
            >
              Admin Register
            </NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden text-3xl cursor-pointer text-blue-500 "
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="bx bx-menu"></i>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[6vh] left-0 bg-gray-200 w-full shadow-lg py-4 flex flex-col items-center gap-4 md:hidden z-10">
          {global.token ? (
            <>
              <NavLink
                to="/admin/my-profile"
                onClick={() => setIsOpen(false)}
                className="text-blue-500"
              >
                My Profile
              </NavLink>
              <NavLink
                to="/admin/update-password"
                onClick={() => setIsOpen(false)}
                className="text-blue-500"
              >
                Update Password
              </NavLink>
              <NavLink
                to="/admin/read-all-user"
                onClick={() => setIsOpen(false)}
                className="text-blue-500"
              >
                Read All User
              </NavLink>
              <NavLink
                to="/admin/logout"
                onClick={() => setIsOpen(false)}
                className="text-blue-500"
              >
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="text-blue-500"
              >
                Admin Login
              </NavLink>
              <NavLink
                to="/admin/register"
                onClick={() => setIsOpen(false)}
                className="text-blue-500"
              >
                Admin Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NavLinks;
