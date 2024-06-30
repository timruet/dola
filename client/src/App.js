import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import volcano from "./images/volcano-cropped.png"
import { useSelector } from 'react-redux'
import { authService } from './authService';
import { domainService } from './domainService';
import { useNavigate } from 'react-router-dom';


import './dist/output.css';
import Home from './Pages/Home';
import Vocabulary from './Pages/Vocabulary';
import Quizz from './Pages/Quizz';
import Login from './Pages/Login';
import Register from './Pages/Register';



function App() {
  authService.auth();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  let userid = null;
  if(isAuthenticated){
      userid = user.id;
      domainService.getDomains(userid);
  } 

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
        <Route path='/vocabulary/:domain' element={<Vocabulary />} />
        <Route path="/quizz/:domain" element={<Quizz />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

function NavigationBar() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
              <img src={volcano} alt="volcanoImage" className="h-6 mr-3" />
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
              <img src={volcano} alt=" volcanoImage" className="h-6 mr-3" />
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
