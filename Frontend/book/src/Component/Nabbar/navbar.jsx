import React from "react"
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";


const Navbar = () => {
    const links = [
        {
            title : "Home" ,
            link : '/'
        } ,
        {
            title : "All Books" ,
            link : "/all-books"
        } , {
              title : "Cart" ,
            link : "/cart"
        } , {
              title : "Profile" ,
              link : "/profile"
        } , {
              title : " Admin Profile" ,
              link : "/profile"
        }
    ];
    const isLoggedIn =  useSelector((state) => state.auth.isLoggedIn);
    const role  = useSelector((state) => state.auth.role)
     if(isLoggedIn === false ) {
        links.splice(2,2)
     }
     if( isLoggedIn === true && role === "user"){
        links.splice(4,1)
     }
     if( isLoggedIn === true && role === "admin"){
        links.splice(3,1)
     }
    return <>
    <div className="flex bg-zinc-800 text-white px-8 py-4 item-center justify-between"> 
        <div className="flex items-center">
            <img className="h-10 me-4" src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png" alt="logo" />
            <h1 className="text-2xl font-semibold">Book Store </h1> 
        </div>
        <div>  </div>
        <div className="nav-links-bookheaven block md:flex item-center gap-4">
            <div className="hidden md:flex gap-4">{links.map((items , i) => <> <Link to={items.link}  className="hover:text-blue-500" key = {i}> {items.title} </Link> </>)}</div>
           {isLoggedIn ===  false  && <>
            <div className="hidden md:flex gap-4">
                <Link to= '/Login' className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"> LogIn </Link>
                <Link  to = '/Signup' className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"> SignUp</Link>
            </div> 
           </>}
            <button className="block md:hidden text-white text-2xl">
                <FaGripLines />
            </button>
        </div>
    </div>
    </>
}
export default Navbar;
