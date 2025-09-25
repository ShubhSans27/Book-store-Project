
import React, { useEffect, useState } from "react";
import axios from 'axios';
import BookCart from "../Footer/BookCart/BookCart";
import Loader from "../loader/loader";


function RecentBook () {
    const [Data , setData ] = useState();
    useEffect(()=> {
        const fetch = async () => {
         const response =   await axios.get('http://localhost:1000/api/v2/get-recent-books');
         setData(response.data.data);
        }
            fetch();
    } , [] )
    return <>
     <div className="mt-8 px-4">
    <h4 className="text-3xl text-yellow-100">Recent Added Book</h4>
    {!Data && ( <div className="flex items-center justify-center my-8 "> <Loader/> </div> ) }
    <div className="my-8 grid grid-cols-1 sm: grid-cols-3 md: grid-cols-4 gap-4" >
        {Data && Data.map((items , i ) => <div key={i}  > <BookCart data={items}/> {" "}  </div>)}
    </div>
     </div>
    </>
}

export default RecentBook;