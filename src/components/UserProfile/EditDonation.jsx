import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EcoNav from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./EditDonation.css";

const EditDonation = () => {
  const { Id } = useParams();
  const navigate = useNavigate();

  const [doacao, setDoacao] = useState({
    titulo: "",
    descricao: "",
    quantidade: "",
    categoria: "",
    condicao: "",
    disponibilidade: "",
    imagensBase64: [],
    imageUrls: [], // Para armazenar URLs de imagens já existentes
  });

  useEffect(() => {
    const fetchDoacaoDetails = async () => {
      const doacaoData = await fetch(`http://localhost:8080/getDoaId/${Id}`);
      const doacaoDetails = await doacaoData.json();
      setDoacao(doacaoDetails);
    };

    fetchDoacaoDetails();
  }, [Id]);

  const handleInputChange = (e) => {
    setDoacao({ ...doacao, [e.target.name]: e.target.value });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(
      files.map((file) => convertToBase64(file))
    );
    setDoacao({
      ...doacao,
      imagensBase64: [...doacao.imagensBase64, ...base64Images],
    });
  };

  const handleSave = async () => {
    const response = await fetch(`http://localhost:8080/updateDoa/${Id}`, {
      method: "PUT",
      body: JSON.stringify(doacao),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      navigate("/user/accountsettings");
    } else {
      const errorMessage = await response.text();
      console.error("Update failed:", errorMessage);
    }
  };

  return (
    <div>
      <EcoNav />
      <div className="EditForm-forms">
        <div className="EditForm-forms-container">
          <div className="EditForm-forms-header">
            <h1 className="EditForm-forms-title">Editar Doação</h1>
          </div>
          <form className="form-editDonation">
            <div className="EditForm-forms-form-group">
              <label className="">Título:</label>
              <input
                type="text"
                className="EditForm-forms-input-field"
                name="titulo"
                value={doacao.titulo}
                onChange={handleInputChange}
              />
            </div>

            <div className="EditForm-forms-form-group-inline">
              <div className="EditForm-forms-input-field-container">
                <label className="form-label-editDonation">Quantidade:</label>
                <input
                  type="number"
                  className="EditForm-forms-input-field"
                  name="quantidade"
                  value={doacao.quantidade}
                  onChange={handleInputChange}
                />
              </div>
              <div className="EditForm-forms-input-field-container">
                <label className="form-label-editDonation">Categoria:</label>
                <select
                  className="form-control"
                  name="categoria"
                  value={doacao.categoria}
                  onChange={handleInputChange}
                >
                  <option value="" disabled hidden>
                    Categoria
                  </option>
                  <option value="Móvel">Móvel</option>
                  <option value="Roupa">Roupa</option>
                  <option value="Eletrônico">Eletrônico</option>
                  <option value="Eletrodoméstico">Eletrodoméstico</option>
                </select>
              </div>
            </div>

            <div className="EditForm-forms-form-group-inline">
              <div className="EditForm-forms-input-field-container">
                <label className="form-label-editDonation">Condição:</label>
                <select
                  className=""
                  name="condicao"
                  value={doacao.condicao}
                  onChange={handleInputChange}
                >
                  <option value="" disabled hidden>
                    Condição
                  </option>
                  <option value="Novo">Novo</option>
                  <option value="Usado - estado de novo">
                    Usado - estado de novo
                  </option>
                  <option value="Usado - em boas condições">
                    Usado - em boas condições
                  </option>
                  <option value="Usado - em condições razoáveis">
                    Usado - em condições razoáveis
                  </option>
                </select>
              </div>
              <div className="EditForm-forms-input-field-container">
                <label className="form-label-editDonation">
                  Disponibilidade:
                </label>
                <select
                  className=""
                  name="disponibilidade"
                  value={doacao.disponibilidade}
                  onChange={handleInputChange}
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>
            </div>

            <div className="EditForm-forms-form-group">
              <label className="form-label-editDonation">Descrição:</label>
              <textarea
                className="EditForm-forms-input-field-Donation"
                name="descricao"
                value={doacao.descricao}
                onChange={handleInputChange}
              />
            </div>

            <div className="ProductForm-forms-image-container">
              <label className="form-label-editDonation">Imagens:</label>
              <div className="ProductForm-forms-image-preview">
                {doacao.imagensBase64.map((base64, index) => (
                  <img
                    key={index}
                    src={base64}
                    alt={`Nova Imagem ${index + 1}`}
                    className="ProductForm-forms-preview-image"
                  />
                ))}
              </div>
            </div>

            <button
              type="button"
              className="ProductForm-forms-submit-btn"
              onClick={handleSave}
            >
              Salvar
            </button>
            {/* <button
              type="button"
              className="ProductForm-forms-submit-btn"
              onClick={handleDelete}
            >
              Já Doei!
            </button> */}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditDonation;
