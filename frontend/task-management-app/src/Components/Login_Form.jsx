import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../Redux/Auth-redux/action";
import { getTASKS } from "../Redux/Task-redux/action";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const data = useSelector((store) => {
    return store.task;
  });

  const nav = useNavigate();

  const handleLogin = () => {
    const userData = { email, password };
    dispatch(signinUser(userData));
    console.log(userData);
    setTimeout(() => {
      nav("/task");
    }, 1000);
  };
  const tosignup = () => {
    nav("/signup");
  };
  useEffect(() => {
    dispatch(getTASKS());
  }, []);

  console.log(data);
  return (
    <div className="Form_contain bg-gray-700">
      <h2 className="text-center text-2xl font-bold text-white">Login</h2>
      <div className="form3 login_form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="signup_btn " onClick={handleLogin}>
          Login
        </button>
        <span onClick={tosignup} className="text-[#030710] cursor-pointer">
          New user Signup
        </span>
      </div>
    </div>
  );
};

export default LoginForm;