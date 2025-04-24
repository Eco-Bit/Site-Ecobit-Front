import React, { useEffect } from 'react';
import './FloatingButton.css';
import { NavLink } from 'react-router-dom';

function FloatingButton() {
  useEffect(() => {
    const handleScroll = () => {
      const buttonContainer = document.querySelector('.floating-button-container');
      if (!buttonContainer) return;

      // Verifica se a página está no final
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 97;

      if (isAtBottom) {
        buttonContainer.classList.add('scrolled-to-bottom');
      } else {
        buttonContainer.classList.remove('scrolled-to-bottom');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="floating-button-container">
      <NavLink to="/ProductForm" className="floating-button">
        <span className="floating-button-icon">
          <i className="fab fa-plus"></i>
          <i className="fa fa-heart"></i>
        </span>
        <span className="floating-button-text"> Nova Doação</span>
      </NavLink>
    </div>
  );
}

export default FloatingButton;