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
  
    <div className="bg-white/50 bg-opacity-100 h-[6vh] flex justify-between items-center px-10 relative">
      <h1 className="text-lg font-bold">Login System</h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6">
        {global.token ? (
          <>
            <NavLink to="/admin/my-profile">My Profile</NavLink>
            <NavLink to="/admin/update-password">Update Password</NavLink>
            <NavLink to="/admin/read-all-user">Read All User</NavLink>
            <NavLink to="/admin/logout">Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/admin/login">Admin Login</NavLink>
            <NavLink to="/admin/register">Admin Register</NavLink>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div
        className="md:hidden text-3xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="bx bx-menu"></i>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-[6vh] left-0 bg-gray-200 w-full shadow-lg py-4 flex flex-col items-center gap-4 md:hidden z-10">
          {global.token ? (
            <>
               <NavLink to="/admin/my-profile"  onClick={() => setIsOpen(false)}>
                My Profile
              </NavLink>
              <NavLink
                to="/admin/update-password"
                onClick={() => setIsOpen(false)}
              >
                Update Password
              </NavLink>
              <NavLink
                to="/admin/read-all-user"
                onClick={() => setIsOpen(false)}
              >
                Read All User
              </NavLink>
              <NavLink to="/admin/logout" onClick={() => setIsOpen(false)}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/admin/login" onClick={() => setIsOpen(false)}>
                Admin Login
              </NavLink>
              <NavLink to="/admin/register" onClick={() => setIsOpen(false)}>
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
