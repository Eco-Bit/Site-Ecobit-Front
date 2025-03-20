import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import EcoNav from "../../components/Navbar/Navbar";
import "./Prod_Detalhes.css";
import FloatingButton from "../../components/FloatingButton/FloatingButton";
import Footer from "../../components/Footer/Footer.jsx";
import Loading from "../../components/Loading/Loading.jsx";

function Prod_Detalhes() {
  const { id } = useParams();
  const [doacao, setDoacao] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoacao = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/getDoaId/${id}`
        );
        setDoacao(response.data);
      } catch (error) {
        console.error("Erro ao buscar a doação:", error);
        setError(
          "Erro ao buscar a doação. Por favor, tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDoacao();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="prod-detalhes-container">
      <EcoNav />
      <div className="Prod_Detalhes">
        <div className="prod-card">
          <div className="prod-card-content">
            <div className="prod-carousel-container">
              <Carousel
                showThumbs={false}
                infiniteLoop={true}
                showStatus={false}
              >
                {doacao.imagensBase64.map((base64, index) => (
                  <img
                    key={index}
                    src={base64}
                    alt={`Nova Imagem ${index + 1}`}
                    className="edit-donation-img-thumbnail"
                  />
                ))}
              </Carousel>
            </div>
            <div className="text-container">
              <h1>{doacao.titulo}</h1>
              <br />
              <h4>Descricao: </h4>
              <p>{doacao.descricao}</p>
              <br></br>
              <p>Quantidade: {doacao.quantidade}</p>
              <br></br>
              <p>Categoria: {doacao.categoria}</p>
              <br></br>
              <p>Condição: {doacao.condicao}</p>
              <br></br>
              <p>Disponibilidade: {doacao.disponibilidade}</p>
              <p>
                <br></br>
                <i className="fab fa-whatsapp" />
                Contato: {doacao.telefone}
              </p>
            </div>
          </div>
        </div>
      </div>
      <FloatingButton />
      <Footer />
    </div>
  );
}

export default Prod_Detalhes;
