import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store/auth";
import { useDispatch } from "react-redux";

function LoginPage() {
  const [value, setValue] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const change = (e) => {
    const { name, value: inputValue } = e.target;
    setValue({ ...value, [name]: inputValue });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = value;

      if (!email || !password) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post("http://localhost:1000/api/v1/sign-in", value);

      const user = response.data.user;
      const role = user.role;

      dispatch(authActions.login({ role })); 

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("id", user._id);

      console.log("Login successful:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Login error:", error.response?.data?.msg || error.message);
      alert(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <form className="bg-zinc-800 p-10 rounded-lg shadow-md w-full max-w-md" onSubmit={submit}>
        <h2 className="text-3xl text-zinc-200 font-semibold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label className="block text-zinc-300 mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={value.email}
            onChange={change}
          />
        </div>

        <div className="mb-6">
          <label className="block text-zinc-300 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={value.password}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
