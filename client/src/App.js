import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Routes, Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import React, {useState, useEffect} from "react";

import './App.css';
import Home from './Pages/Home';
import ElderCare from './Pages/ElderCare';
import Construction from './Pages/Construction';



function App() {
  /*const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api/getRequest")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  React.useEffect(() => {
    fetch("/api/postRequest")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/

  return (
    <>
      <NavigationBar className="NLink"/>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/eldercare" element={<ElderCare />} />
          <Route path="/construction" element={<Construction />} />
       </Routes>
    </>
  )
}

function NavigationBar(){
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container >
        <Navbar.Brand ><NavLink to="/home" className="Link">dola</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Domain" id="basic-nav-dropdown">
              <NavDropdown.Item ><NavLink  className="Link" to="/eldercare" >Elder Care</NavLink></NavDropdown.Item>
              <NavDropdown.Item ><NavLink className="Link" to="/construction">Construction</NavLink></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default App;
