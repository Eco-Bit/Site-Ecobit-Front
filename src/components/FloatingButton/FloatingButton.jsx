import React from 'react';
import './FloatingButton.css';
import { NavLink } from 'react-router-dom';

function FloatingButton() {
  return (
    <div className="floating-button-container">
      <NavLink to="/ProductForm" className="floating-button">
        <span className="floating-button-icon"><i className="fab fa-plus"></i><i className="fa fa-heart"></i></span>
        <span className="floating-button-text"> Nova Doação</span>
      </NavLink>
    </div>
  );
}

export default FloatingButton;
