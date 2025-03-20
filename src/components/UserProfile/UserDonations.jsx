import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserDonations.css";
import Loader from "../Loading/Loading";
import { FaRegSmileWink } from "react-icons/fa";


const UserDonations = () => {
  const userId = localStorage.getItem("id");
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDonationId, setSelectedDonationId] = useState(null);

  useEffect(() => {
    const fetchDoacoes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getDoaUser/${userId}`
        );
        console.log(response.data);
        setDoacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar as doações:", error);
        setError(
          "Erro ao buscar as doações. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoacoes();
  }, [userId]);

  const deleteDonation = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/deleteDoa/${id}`);
      setDoacoes(doacoes.filter((doacao) => doacao.id !== id));
      setShowModal(false);
    } catch (error) {
      console.error("Erro ao deletar a doação:", error);
      setError(
        "Erro ao deletar a doação. Por favor, tente novamente mais tarde."
      );
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedDonationId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDonationId(null);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="edit-donation-container">
      <h1 className="text-center">Lista de Doações</h1>
      {doacoes.length === 0 ? (
        <div className="no-donations-message">
          Você não tem doações cadastradas.
        </div>
      ) : (
        <div className="edit-donation-row">
          {doacoes.map((doacao) => (
            <div key={doacao.id} className="col-md-4 mb-4">
              <div className="edit-donation-card">
                <div className="edit-donation-card-body">
                  <h5 className="edit-donation-card-title">{doacao.titulo}</h5>
                  <p className="edit-donation-card-text">
                    {doacao.imagensBase64.length > 0 && (
                      <img
                        src={doacao.imagensBase64[0]}
                        alt="Imagem da doação"
                        className="edit-donation-img-thumbnail"
                      />
                    )}
                  </p>
                  <p className="edit-donation-card-text">
                    Quantidade: {doacao.quantidade}
                  </p>
                  <p className="edit-donation-card-text">
                    Categoria: {doacao.categoria}
                  </p>
                  <Link
                    to={`/EditDonation/${doacao.id}`}
                    className="edit"
                  >
                    Editar
                  </Link>
                  <button className="donationed" onClick={() => handleDeleteClick(doacao.id)}>
                    Já Doei!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="delete-modal">
          <div className="delete-modal-content">
          <FaRegSmileWink className="sorriso"/>
            <h2>Parabéns!</h2>
            <p>Que bom que conseguiu doar para alguém!</p>
            <p>Ao confirmar o produto será deletado.</p>
            <button className="cancelar-button" onClick={handleCloseModal}>
              Cancelar
            </button>
            <button className="deletar-button" onClick={() => deleteDonation(selectedDonationId)}>
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDonations;
