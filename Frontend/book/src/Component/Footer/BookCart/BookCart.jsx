
import React from "react";
import { Link } from "react-router-dom";


function BookCart({ data }) {
    console.log(data)
    return <>
     <Link to={`/view-book-details/${data._id}`}>
     <div className="bg-zinc-800 rounded p-4 flex flex-col" ><div className="bg-zinc-900 rounded flex items-center justify-center">
         <img src= {data.url} alt="/" className="h-[25vh]"/> </div>
         <h2 className="mt-4 text-xl text-white font-semibold"> {data.title}</h2>
         <p className="mt-2 text-zinc-200 font-semibold"></p>
         <p className="mt-2 text-zinc-200 font-semibold text-xl">
            ₹{data.price}
         </p>
         <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold text-base px-5 py-2 rounded-lg border border-yellow-400 shadow-sm transition duration-200 ease-in-out">
     Remove From Favourite
     </button>
         </div>

     </Link>

    </>
}

export default  BookCart ;