import React from "react";
import "./DeleteButton.css";
import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'; // Importe o ícone, se necessário

const DeleteButton = ({ id }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleRefresh = async () => {
    window.location.reload();
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/deleteDoa/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setShowConfirmationModal(true);
        
      } else {
        alert("Failed to delete the item.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while deleting the item.");
    }
  };

  return (
    <div>
      <button className="delete-button" onClick={handleDelete}>
        X
      </button>
      {showConfirmationModal && (
        <div className="EcopontoForm-modal active">
          <div className="EcopontoForm-modal-content">
            <FaCheckCircle className="EcopontoForm-modal-icon" />
            <p>Produto Deletado com sucesso</p>
            <button className="produto-delete-button-modal" onClick={handleRefresh}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
