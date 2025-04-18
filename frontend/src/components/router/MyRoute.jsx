import React, { useContext } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import AdminForgotPassword from "../webUsersLogin/AdminForgotPassword";
import AdminLogin from "../webUsersLogin/AdminLogin";
import AdminLogout from "../webUsersLogin/AdminLogout";
import AdminProfile from "../webUsersLogin/AdminProfile";
import AdminProfileUpdate from "../webUsersLogin/AdminProfileUpdate";
import AdminRegister from "../webUsersLogin/AdminRegister";
import AdminResetPassword from "../webUsersLogin/AdminResetPassword";
import AdminUpdatePassword from "../webUsersLogin/AdminUpdatePassword";
import AdminVerify from "../webUsersLogin/AdminVerify";
import ReadAllUser from "../webUsersLogin/ReadAllUser";
import ReadSpecificUsers from "../webUsersLogin/ReadSpecificUsers";
import UpdateSpecificUsers from "../webUsersLogin/UpdateSpecificUsers";
import NavLinks from "./NavLinks";
import { GlobalVariableContext } from "../../App";
import Home from "../webUsersLogin/Home";
import Dashboard from "../webUsersLogin/Dashboard";


const MyRoute = () => {
  let { token } = useContext(GlobalVariableContext);
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <NavLinks></NavLinks>
              <Outlet></Outlet>
            </div>
          }
        >
          <Route index element={<Home></Home>}></Route>
          <Route
            path="reset-password"
            element={<AdminResetPassword></AdminResetPassword>}
          ></Route>
          <Route
            path="verify-email"
            element={<AdminVerify></AdminVerify>}
          ></Route>

          <Route path="admin" element={<Outlet></Outlet>}>
            {token ? (
              <>
                <Route
                  index
                  element={
                    <Dashboard></Dashboard>
                  }
                ></Route>
                <Route
                  path="my-profile"
                  element={<AdminProfile></AdminProfile>}
                ></Route>
                <Route
                  path="profile-update"
                  element={<AdminProfileUpdate></AdminProfileUpdate>}
                ></Route>
                <Route
                  path="logout"
                  element={<AdminLogout></AdminLogout>}
                ></Route>
                <Route
                  path="update-password"
                  element={<AdminUpdatePassword></AdminUpdatePassword>}
                ></Route>
                <Route
                  path="read-all-user"
                  element={<ReadAllUser></ReadAllUser>}
                ></Route>
                <Route
                  path=":id"
                  element={<ReadSpecificUsers></ReadSpecificUsers>}
                ></Route>
                <Route path="update" element={<Outlet></Outlet>}>
                  <Route
                    path=":id"
                    element={<UpdateSpecificUsers></UpdateSpecificUsers>}
                  ></Route>
                </Route>
              </>
            ) : (
              <></>
            )}

            <Route
              path="register"
              element={<AdminRegister></AdminRegister>}
            ></Route>
            <Route path="login" element={<AdminLogin></AdminLogin>}></Route>

            <Route
              path="forgot-password"
              element={<AdminForgotPassword></AdminForgotPassword>}
            ></Route>
          </Route>
        </Route>
        <Route path="*" element={<div>404 Page</div>}></Route>
      </Routes>
    </div>
  );
};

export default MyRoute;

/* 
While getting token
  add token to useContext from localstorage

if other component needs token
  get token from usecontext than locaStorage (For page refresh purpose)

while chage token 
  change to localStorage
  change to useContext

*/
