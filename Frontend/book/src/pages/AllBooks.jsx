import { useEffect , useState } from "react";
import axios from "axios";
import React from "react";
import BookCart from "../Component/Footer/BookCart/BookCart";
import Loader from "../Component/loader/loader";


function AllBooks () {
     const [Data , setData ] = useState();
    useEffect(()=> {
        const fetch = async () => {
         const response =   await axios.get('http://localhost:1000/api/v2/get-all-book');
         setData(response.data.data);
        }
            fetch();
    } , [] )
    return <>
    <div className="bg-zinc-900 h-auto px-12 py-8">
          <h4 className="text-3xl text-yellow-100">All  Book</h4>
    {!Data && ( <div className="flex items-center justify-center my-8 "> <Loader/> </div> ) }
    <div className="my-8 grid grid-cols-1 sm: grid-cols-3 md: grid-cols-4 gap-4" >
        {Data && Data.map((items , i ) => <div key={i}  > <BookCart data={items}/> {" "}  </div>)}
    </div>
     </div>
    </>
}

export default AllBooks