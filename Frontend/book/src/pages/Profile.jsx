import React, { useEffect, useState } from "react";
import SideBar from "../Component/profile/sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../Component/loader/loader";

function Profile() {
    const [Profile , setProfile ] = useState();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userStr = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!userStr || !token) {
          console.error("User or token not found in localStorage");
          return navigate("/login"); 
        }

        const user = JSON.parse(userStr); 
        const headers = {
          id: user.id,
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );

        setProfile( response.data);
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
        {!Profile && <Loader />}
        {Profile &&    <>
      <div className="w-full  md:w-1/6">
        <SideBar data = {Profile} />
      </div>
      <div className="w-full  md:w-5/6">
        <Outlet />
      </div>
       </>}
    </div>
   
  );
}

export default Profile;
