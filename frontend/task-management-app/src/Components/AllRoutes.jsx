import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import LoginForm from "./Login_Form";
import SignupForm from "./Signup_Form";
import Task from "./Task";
import HomePage from "./HomePage";

function AllRoutes() {
  const access = localStorage.getItem("logintoken");

  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/task" element={<Task />} />
      </Routes>
      
    </div>
  );
}

export default AllRoutes;