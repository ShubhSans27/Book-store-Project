import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "../Footer/BookCart/BookCart";

const Favourate = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const getFavBooks = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!storedUser || !token) {
        alert("User not logged in");
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id || user.id;

      console.log("Sending User ID:", userId); 
      console.log("Sending Token:", token);    

      try {
        const res = await axios.get("http://localhost:1000/api/v3/add-favbook", {
          headers: {
            id: userId,
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response Data:", res.data); 
        setBooks(res.data.data || []);
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        alert("Failed to fetch favourite books");
      }
    };

    getFavBooks();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-100 p-6"> 
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-zinc-800">❤️ Favourite Books</h2>

      {books.length === 0 ? (
        <p className="text-center text-zinc-500 text-lg">No favourites found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-200 shadow rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300"
            >
              <BookCart data={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
  );
};

export default Favourate;
