import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../img/nav-logo.png";
import { BsPersonFill, BsDoorOpen } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

function EcoNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".custom-navbar");
      if (window.scrollY > 100) {
        navbar.classList.add("navbar-small");
      } else {
        navbar.classList.remove("navbar-small");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const id = localStorage.getItem("id");
    setIsLoggedIn(!!id);
    if (id === "665b8ab700c45758228ec303") {
      setIsAdmin(true);
    }

    if (id) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:8080/getUserId/${id}`);
          if (!response.ok) {
            throw new Error("Erro ao buscar os dados do usuário");
          }
          const userData = await response.json();
          setUserName(userData.nome);
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // Redirect to LoginHome
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-brand">
          <img src={Logo} alt="Logo" />
        </a>
        <div className="navbar-toggle" id="navbar-toggle">
          <span className="navbar-toggle-icon"></span>
        </div>
        <div className="navbar-collapse" id="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to={isLoggedIn ? "/" : "/"} className="nav-link" activeClassName="active" exact>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Ecopontos" className="nav-link" activeClassName="active">
                Ecopontos
              </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/Donation" className="nav-link" activeClassName="active">
                  Produtos
                </NavLink>
              </li>
          
            {isAdmin && (
              <li className="nav-item">
                <NavLink to="/EcopontoForm" className="nav-link" activeClassName="active">
                  Adicionar Ecopontos
                </NavLink>
              </li>
            )}
          </ul>
          <div className="auth-container">
            {isLoggedIn ? (
              <div className="dropdown">
                <button className="dropdown-toggle">
                  <h2 className="user-name">{isAdmin ? "Administrador" : "Ola, " + userName}</h2>
                </button>
                <div className="dropdown-menu">
                  <a href="/user/accountsettings" className="dropdown-item">
                    Perfil <BsPersonFill className="drop-icon-person" />
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#!" className="dropdown-item" onClick={handleLogout}>
                    Sair <BsDoorOpen className="drop-icon-exit" />
                  </a>
                </div>
              </div>
            ) : (
              <NavLink to="/Register" className="nav-link1" activeClassName="active">
                 <FontAwesomeIcon icon={faArrowRightToBracket} /> Entrar
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default EcoNav;
