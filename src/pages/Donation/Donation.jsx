import React, { useState, useEffect } from 'react';
import EcoNav from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import './Donation.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading/Loading.jsx';
import DeleteButton from '../../components/DeleteButton/DeleteBotton.jsx';

function Donation() {
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id !== null) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchDoacoes = async () => {
      try {
        const response = await axios.get('http://localhost:8080/getAllDoa');
        setDoacoes(response.data);
      } catch (error) {
        console.error("Erro ao buscar as doações:", error);
        setError("Erro ao buscar as doações. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoacoes();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <EcoNav />
      <div className="Donation">
        <div className='headers'>
          <img src="src\img\headerGurias.png" id="headerGurias"></img>
        </div>
        {isLoggedIn && (
          <NavLink to="/ProductForm" className="newDonation">
            <i className="fab fa-plus"></i> Nova Doação
          </NavLink>
        )}
        <div className='product-container'>
          {doacoes.map(doacao => (
            <div key={doacao.id} className='product-card'>
              {isLoggedIn && localStorage.getItem('id') === "665b8ab700c45758228ec303" && <DeleteButton id={doacao.id} />} {/* Adicionado verificação de isLoggedIn */}
              <NavLink to={`/Prod_Detalhes/${doacao.id}`}>
                <div className="image-wrapper">
                  {doacao.imagensBase64.map((base64, index) => (
                    <img
                      key={index}
                      src={base64}
                      alt={`Nova Imagem ${index + 1}`}
                      className="edit-donation-img-thumbnail"
                    />
                  ))}
                </div>
              </NavLink>
              <h2>{doacao.titulo}</h2>
              <p>
                {doacao.condicao}
                <br />
                Quantidade: {doacao.quantidade}
              </p>
              <NavLink to={`/Prod_Detalhes/${doacao.id}`} className='NavLink'>Detalhes</NavLink>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Donation;
