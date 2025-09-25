import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SideBar({ data, onLogout }) {
  const role = useSelector((state) => state.auth.role);
  console.log("Role from Redux:", role); 

  if (!role) return <div className="text-white">Loading Sidebar...</div>;

  return (
    <div className="bg-zinc-800 p-6 rounded-lg flex flex-col items-center justify-between h-full w-full max-w-[280px] shadow-md">
      <div className="flex items-center flex-col">
        <img
          src={data.avatar}
          alt="avatar"
          className="h-[12vh] w-[12vh] rounded-full object-cover border-2 border-zinc-600"
        />
        <p className="mt-4 text-xl text-zinc-100 font-semibold">{data.username}</p>
        <p className="mt-1 text-sm text-zinc-400">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-600"></div>
      </div>

      {role === "user" ? (
        <nav className="mt-6 w-full flex flex-col gap-2">
          <Link to="/profile" className="text-zinc-100 font-medium w-full py-2 text-center hover:bg-zinc-700 rounded transition-all">Favourites</Link>
          <Link to="/profile/orderHistory" className="text-zinc-100 font-medium w-full py-2 text-center hover:bg-zinc-700 rounded transition-all">Order History</Link>
          <Link to="/profile/settings" className="text-zinc-100 font-medium w-full py-2 text-center hover:bg-zinc-700 rounded transition-all">Settings</Link>
        </nav>
      ) : role === "admin" ? (
        <nav className="mt-6 w-full flex flex-col gap-2">
          <Link to="/profile" className="text-zinc-100 font-medium w-full py-2 text-center hover:bg-zinc-700 rounded transition-all">All Orders</Link>
          <Link to="/profile/addBook" className="text-zinc-100 font-medium w-full py-2 text-center hover:bg-zinc-700 rounded transition-all">Add Book</Link>
        </nav>
      ) : null}

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="mt-6 text-red-400 border border-red-400 w-full py-2 text-center rounded hover:bg-red-500 hover:text-white transition-all"
      >
        Logout
      </button>
    </div>
  );
}

export default SideBar;
