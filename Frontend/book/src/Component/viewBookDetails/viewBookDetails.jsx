import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

function BookDetails() {
  const { id } = useParams();
  const [Data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v2/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      }
    };
    fetch();
  }, [id]);

  const handleFavourate = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || !(storedUser._id || storedUser.id)) {
        alert("User not found. Please login again.");
        return;
      }

      const userId = storedUser._id || storedUser.id;

      await axios.put(
        "http://localhost:1000/api/v3/add-favourat",
        { userId, bookId: id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Book added to favourites!");
    } catch (error) {
      console.error("Error adding to favourites:", error.response?.data || error.message);
      alert("Something went wrong.");
    }
  };

  const handleCart = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || !(storedUser._id || storedUser.id)) {
        alert("User not found. Please login again.");
        return;
      }

      const userId = storedUser._id || storedUser.id;

      const response = await axios.put(
        "http://localhost:1000/api/v4/add-cart",
        {},
        {
          headers: {
            id: userId,
            bookid: id,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.msg);
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
      alert("Something went wrong while adding to cart.");
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || !(storedUser._id || storedUser.id)) {
        alert("User not found. Please login again.");
        return;
      }

      const userId = storedUser._id || storedUser.id;

      const response = await axios.post(
        "http://localhost:1000/api/v5/placed-order",
        {
          order: [Data], // place current book as order
        },
        {
          headers: {
            id: userId,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert(response.data.message || "Order placed successfully!");
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("Something went wrong while placing the order.");
    }
  };

  if (!Data) {
    return <div className="text-white text-center py-10">Loading...</div>;
  }

  return (
    <div className="px-12 py-8 bg-zinc-900 flex gap-8 text-white">
      <div className="bg-zinc-800 rounded p-4 h-[88vh] w-3/6 flex items-center justify-center">
        <img src={Data.url} alt={Data.title} className="h-[70vh]" />
      </div>

      {isLoggedIn && (
        <div className="flex md:flex-col">
          <button onClick={handleFavourate} className="bg-black rounded-full text-3xl p-2">
            <FaHeart />
          </button>
          <button onClick={handleCart} className="bg-black rounded-full text-3xl p-2 mt-4">
            <FaShoppingCart />
          </button>
          <button onClick={handlePlaceOrder} className="bg-green-700 hover:bg-green-800 text-white text-sm rounded p-2 mt-4">
            Place Order
          </button>
        </div>
      )}

      <div className="p-4 w-3/6">
        <h1 className="text-4xl text-zinc-300 font-semibold">{Data.title}</h1>
        <p className="text-zinc-400 mt-1">by {Data.author}</p>
        <p className="text-zinc-500 mt-4 text-xl">{Data.desc}</p>
        <p className="flex mt-4 items-center text-zinc-400">
          <GrLanguage className="me-2" /> {Data.language}
        </p>
        <p className="mt-4 text-zinc-100 text-3xl font-semibold">
          Price: ₹{Data.price}
        </p>
      </div>
    </div>
  );
}

export default BookDetails;
