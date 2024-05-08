import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';
import Logo from '../../img/nav-logo.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation } from 'react-router-dom'; 

function EcoNav() {
  const location = useLocation(); 
  const [activePage, setActivePage] = useState(location.pathname); 

  const handleSetActivePage = (path) => {
    setActivePage(path);
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/"><img src={Logo} width="80" height="28" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link href="/" className={`nav-link-custom ${activePage === "/" && "active"}`} onClick={() => handleSetActivePage('/')}>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Ecopontos" className={`nav-link-custom ${activePage === "/Ecopontos" && "active"}`} onClick={() => handleSetActivePage('/Ecopontos')}>Ecopontos</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/Register" className={`nav-link-custom ${activePage === "/Register" && "active"}`} onClick={() => handleSetActivePage('/Register')}>Cadastre-se</Nav.Link>
              </Nav.Item>
            </Nav>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Pesquisar"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="btn btn-success custom-btn"><i className="fa fa-search"></i> </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default EcoNav;
