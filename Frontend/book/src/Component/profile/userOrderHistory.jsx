import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("User not logged in.");
        return;
      }

      const response = await axios.get("http://localhost:1000/api/v5/get-all-history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.status === "success") {
        setOrders(response.data.data);
      } else {
        alert(response.data.message || "Failed to fetch orders.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
      alert("Something went wrong while fetching orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading orders...</div>;
  }

  if (orders.length === 0) {
    return <div className="text-center text-white">No orders found.</div>;
  }

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl font-bold mb-4">📦 All Orders</h2>

      {orders.map((order, index) => (
        <div
          key={order._id || index}
          className="bg-zinc-800 p-4 rounded mb-4 shadow"
        >
          <p className="text-sm text-gray-400">
            Order Date:{" "}
            {order.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "N/A"}
          </p>

          {/* User Details */}
          {order.user ? (
            <p className="text-sm text-gray-300">
              Ordered By: <span className="font-medium">{order.user.name || "Unknown User"}</span>
              {" "}({order.user.email || "No Email"})
            </p>
          ) : (
            <p className="text-red-500">User details not available</p>
          )}

          {/* Book Details */}
          {order.book ? (
            <div className="mt-3 flex items-center space-x-4">
              <img
                src={order.book.url}
                alt={order.book.title}
                className="h-24 w-16 object-cover rounded"
              />
              <div>
                <p className="text-lg font-semibold">{order.book.title}</p>
                <p className="text-gray-300">Author: {order.book.author}</p>
                <p className="text-green-400 font-bold">₹{order.book.price}</p>
                <p className="text-sm mt-1">
                  Status:{" "}
                  <span className="font-medium">
                    {order.status || "Order Placed"}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-red-500 mt-2">Book details not available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
