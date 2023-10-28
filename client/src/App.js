import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Routes, Route } from 'react-router-dom';
import { NavLink, useNavigate } from 'react-router-dom';

import './App.css';
import Home from './Pages/Home';
import Vocabulary from './Pages/Vocabulary';
import Quizz from './Pages/Quizz';



function App() {

  return (
    <>
      <NavigationBar />
       <Routes>
          {/* <Route path="/login" element={<Login/>} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/eldercare" element={<Vocabulary domain="eldercare" />} />
          <Route path="/construction" element={<Vocabulary domain="construction"/>} />
          <Route path="/construction/quizz" element={<Quizz domain="construction"/>} />
          <Route path="/eldercare/quizz" element={<Quizz domain="eldercare"/>} />
       </Routes>
    </>
  )
}

function NavigationBar(){
  const navigate = useNavigate();
  const handleSelect = ((eventKey) => {
    navigate(eventKey);
  });

// function requireAuth(nextState, replace, next) {
//   if (!authenticated) {
//     replace({
//       pathname: "/login",
//       state: {nextPathname: nextState.location.pathname}
//     });
//   }
//   next();
// }

  return (
    <>
    <Navbar className="navbar navbar-dark bg-dark">
      <Container >
      <NavLink to="/home" className="brand"><Navbar.Brand >dola</Navbar.Brand></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" onSelect={handleSelect}>
            <NavDropdown title="Domain" id="basic-nav-dropdown">
            <NavDropdown.Item eventKey='/eldercare'><div  className="Link" to="/eldercare" >Elder Care</div></NavDropdown.Item>
            <NavDropdown.Item eventKey='/construction'><div className="Link" to="/construction">Construction</div></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}



export default App;
