import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCart from "../Component/Footer/BookCart/BookCart";

const Cart = () => {
  const [books, setBooks] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total price of all books
  const calculateTotal = (bookList) => {
    const total = bookList.reduce((acc, book) => acc + (book.price || 0), 0);
    setTotalAmount(total);
  };

  // Fetch cart books
  useEffect(() => {
    const getCartBooks = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (!storedUser || !token) {
        alert("User not logged in.");
        return;
      }

      const user = JSON.parse(storedUser);
      const userId = user._id || user.id;

      try {
        const res = await axios.get("http://localhost:1000/api/v4/get-cart-books", {
          headers: {
            id: userId,
            Authorization: `Bearer ${token}`,
          },
        });

        const cartBooks = res.data.data || [];
        setBooks(cartBooks);
        calculateTotal(cartBooks);
      } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        alert("Failed to fetch cart books");
      }
    };

    getCartBooks();
  }, []);

  // Delete cart book
  const deleteCartBook = async (bookId) => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      alert("User not logged in.");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user._id || user.id;

    try {
      const res = await axios.delete("http://localhost:1000/api/v4/remove-cart", {
        headers: {
          id: userId,
          bookid: bookId,
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message || "Book removed from cart");

      const updatedBooks = books.filter((b) => b._id !== bookId);
      setBooks(updatedBooks);
      calculateTotal(updatedBooks);
    } catch (error) {
      console.error("Delete Error:", error.response?.data || error.message);
      alert("Failed to remove book from cart");
    }
  };

  // Place order
  const placeOrder = async () => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      alert("User not logged in.");
      return;
    }

    const user = JSON.parse(storedUser);
    const userId = user._id || user.id;

    if (books.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v5/placed-order",
        { order: books },
        {
          headers: {
            id: userId,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message || "Order placed successfully!");
      setBooks([]);
      setTotalAmount(0);
    } catch (error) {
      console.error("Place Order Error:", error.response?.data || error.message);
      alert("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-zinc-800">
          🛒 Your Cart
        </h2>

        {books.length === 0 ? (
          <p className="text-center text-zinc-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="text-right text-lg font-semibold mb-2 text-zinc-700">
              Total Amount: ₹{totalAmount}
            </div>

            <div className="text-right mb-6">
              <button
                onClick={placeOrder}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
              >
                Place Your Order
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((item, i) => (
                <div
                  key={i}
                  className="bg-zinc-200 shadow rounded-xl overflow-hidden transition-transform hover:scale-105 duration-300"
                >
                  <BookCart data={item} />
                  <div className="flex justify-center p-3">
                    <button
                      onClick={() => deleteCartBook(item._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
