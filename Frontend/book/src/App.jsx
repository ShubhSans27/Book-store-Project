
import './App.css'
import Footer from './Component/Footer/footer'
import Navbar from './Component/Nabbar/navbar'
import AllBooks from './pages/AllBooks'
import Home from './pages/Home'
import {  Routes , Route } from 'react-router-dom'
import SignUp from './pages/Signup'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import BookDetails from './Component/viewBookDetails/viewBookDetails'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authActions } from './store/auth'
import Favourate from './Component/profile/favRate'
import OrderHistory from './Component/profile/userOrderHistory'
import Setting from './Component/profile/Setteing'
import AllOrder from './pages/AllOrder'
import AddBooks from './pages/AddBooks'

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(()=> {
    if(
      localStorage.getItem("id")&&
      localStorage.getItem("token")&&
      localStorage.getItem("role")
    ){
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")))
    }
  })
  return (
    <>
      <Navbar />  
      <Routes>
        <Route exact path='/'  element={<Home/>} />
        <Route  path='/all-books'  element={<AllBooks/>} />
        <Route  path='/signup'  element={<SignUp/>} />
        <Route  path='/login'  element={<Login/>} />
        <Route  path='/cart'  element={<Cart/>} />
        <Route  path='/profile'  element={<Profile/>} > 
        {role === "user" ? <Route  index element={<Favourate/>} /> : <Route index element={<AllOrder/>} />}
        {role == "admin" && <Route  path='/profile/addbook' element={<AddBooks/>} />}
          <Route  path='/profile/orderHistory' element={<OrderHistory/>} />
           <Route  path='/profile/Setteing' element={<Setting/>} />
        </Route>
        <Route path='/view-book-details/:id' element = {< BookDetails/>} />
      </Routes>
      <Footer/> 
 
    </>
  )
}

export default App
