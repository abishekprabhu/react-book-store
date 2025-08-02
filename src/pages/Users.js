import React from "react";
import UserFormComp from "../components/UserFormComp";
import { Outlet } from "react-router-dom";

const Users = () => {
  return (
    <>
      <UserFormComp />
      <Outlet />
    </>
  );
};

export default Users;
