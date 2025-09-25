import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupPage() {
  const [Value, setValue] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });
  const navigate = useNavigate();

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { username, email, password, address } = Value;
      if (!username || !email || !password || !address) {
        alert("All fields are required");
      } else {
        const response = await axios.post("http://localhost:1000/api/v1/sign-up" , Value);
        console.log(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <form
        onSubmit={submit}
        className="bg-zinc-800 p-10 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl text-zinc-200 font-semibold mb-6 text-center">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-zinc-300 mb-1">Name</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={Value.username}
            onChange={change}
          />
        </div>

        <div className="mb-4">
          <label className="block text-zinc-300 mb-1">E mail</label>
          <input
            type="email"
            placeholder="xyz@gmail.com"
            name="email"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={Value.email}
            onChange={change}
          />
        </div>

        <div className="mb-4">
          <label className="block text-zinc-300 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={Value.password}
            onChange={change}
          />
        </div>

        <div className="mb-6">
          <label className="block text-zinc-300 mb-1">Address</label>
          <textarea
            placeholder="address"
            name="address"
            className="w-full px-4 py-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            value={Value.address}
            onChange={change}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold transition"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
