import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Routes, Route } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';
import volcano from "./images/volcano-cropped.png"
import { Helmet } from 'react-helmet';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { authService } from './authService';
import Cookies from 'js-cookie';


import './dist/output.css';
import Home from './Pages/Home';
import Vocabulary from './Pages/Vocabulary';
import Quizz from './Pages/Quizz';
import Login from './Pages/Login';
import Register from './Pages/Register';



function App() {
  return (
    <>
      {/* <Helmet>
        <style>{'body { background-color: whitesmoke; }'}</style>
      </Helmet>  */}
      <NavigationBar />
      <Routes>
        {/* <Route path="/login" element={<Login/>} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/domain/eldercare" element={<Vocabulary domain="eldercare" />} />
        <Route path="/domain/construction" element={<Vocabulary domain="construction" />} />
        <Route path="/domain/construction/quizz" element={<Quizz domain="construction" />} />
        <Route path="/domain/eldercare/quizz" element={<Quizz domain="eldercare" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

function NavigationBar() {
  const navigate = useNavigate();
  authService.auth();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  async function handleClick() {
    authService.logout();
    navigate('/home');
  }
  if (!isAuthenticated) {
    return (
      <>
        <nav className="bg-gray-800 shadow-md top-0 left-0 w-screen">
          <div className="relative max-w-screen-xl flex flex-wrap items-center justify-start mx-auto p-3 w-screen">
            <a href="/home" className="flex items-center hover:bg-gray-700 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <img src={volcano} className="h-6 mr-3" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white ">dola</span>
            </a>
            <a href="/register" className="flex items-center  hover:bg-gray-700 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white ">register</span>
            </a>
            <a href="/login" className="flex items-center  hover:bg-gray-700 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white ">login</span>
            </a>
          </div>
        </nav>
      </>
    );
  }
  else {
    return (
      <>
        <nav className="bg-gray-800 shadow-md top-0 left-0 w-screen">
          <div className="relative max-w-screen-xl flex flex-wrap items-center justify-start mx-auto p-3 w-screen">
            <a href="/home" className="flex items-center hover:bg-gray-700 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <img src={volcano} className="h-6 mr-3" />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white ">dola</span>
            </a>
            <a href="/home" onClick={handleClick} className="flex items-center  hover:bg-gray-700 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white ">logout</span>
            </a>
          </div>
        </nav>
      </>
    );
  }
}



export default App;
