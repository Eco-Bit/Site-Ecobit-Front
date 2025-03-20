import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Button = ({ path }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(path);
  };

  return (
    <button className="home-button" onClick={handleClick}>
      <p>Veja mais</p>
      <div className="seta">
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </button>
  );
};

export default Button;
