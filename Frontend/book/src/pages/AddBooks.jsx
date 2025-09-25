import React, { useState } from "react";
import axios from "axios";

function AddBooks() {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return alert("You're not logged in!");
      }

      const response = await axios.post(
        "http://localhost:1000/api/v2/add-book",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert(response.data.message || "Book added successfully");

      // Reset form
      setFormData({
        url: "",
        title: "",
        author: "",
        price: "",
        desc: "",
        language: ""
      });
    } catch (error) {
      console.error("Error adding book:", error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-zinc-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-8 rounded-md w-full max-w-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Book</h2>

        {["url", "title", "author", "price", "desc", "language"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block mb-1 capitalize">{field}</label>
            <input
              type={field === "price" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none"
              placeholder={`Enter ${field}`}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBooks;
