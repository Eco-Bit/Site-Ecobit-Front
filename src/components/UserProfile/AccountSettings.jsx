import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AccountSettings.css";
import InputMask from "react-input-mask";
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import Loading from "../Loading/Loading";

const AccountSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nome: "",
    telefone: "",
    email: "",
    endereco: "",
    cep: "",
  });
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [cepValid, setCepValid] = useState(true); // Estado para controlar se o CEP é válido
  const [cepLoading, setCepLoading] = useState(false); // Estado para controlar o loading da consulta

  const toggleSuccessModal = () => {
    setSuccessModalOpen(!isSuccessModalOpen);
  };

  const toggleErrorModal = () => {
    setErrorModalOpen(!isErrorModalOpen);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const chave = localStorage.getItem("id");
        if (!chave) {
          throw new Error("ID do usuário não encontrado no localStorage");
        }
        const response = await fetch(
          `http://localhost:8080/getUserId/${chave}`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados do usuário");
        }
        const userDataFromBackend = await response.json();
        setUserData(userDataFromBackend);
      } catch (error) {
        console.error("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCepBlur = async (e) => {
    const cep = e.target.value.replace(/\D/g, '');
    
    if (cep.length !== 8) {
      setCepValid(false);
      return;
    }

    setCepLoading(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        setCepValid(false);
        setError("CEP não encontrado");
        toggleErrorModal();
      } else {
        setCepValid(true);
        setUserData(prev => ({
          ...prev,
          endereco: `${data.logradouro || ''}${data.logradouro && data.bairro ? ', ' + data.bairro : ''}`
        }));
      }
    } catch (error) {
      console.error("Erro ao consultar CEP:", error);
      setCepValid(false);
      setError("Erro ao consultar CEP");
      toggleErrorModal();
    } finally {
      setCepLoading(false);
    }
  };

  const handleSave = async () => {
    const {nome, telefone, email, endereco, cep} = userData;
    try {
      const chave = localStorage.getItem("id");
      if (!chave) {
        setError("Usuário não encontrado");
        toggleErrorModal();
        throw new Error("ID do usuário não encontrado no localStorage");
      }

      if(!nome || !telefone || !email){
        setError("Preencha todos os campos obrigatórios");
        toggleErrorModal();
        throw new Error("Preencha todos os campos obrigatórios");
      }

      // Valida o CEP se foi preenchido
      if (cep && !cepValid) {
        setError("CEP inválido ou não encontrado");
        toggleErrorModal();
        return;
      }

      const response = await fetch(
        `http://localhost:8080/updateUser/${chave}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        setError("Erro ao salvar os dados do usuário");
        toggleErrorModal();
        throw new Error("Erro ao atualizar os dados do usuário");
      }
      
      setMessage("Atualizações feitas com Sucesso!")
      toggleSuccessModal();

      navigate("/user/accountsettings");
    } catch (error) {
      console.error("Erro ao atualizar os dados do usuário:", error);
    }
  };

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Informações Pessoais</h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="nome">
            Seu nome <span>*</span>
          </label>
          <input
            type="text"
            name="nome"
            id="nome"
            value={userData.nome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">
            Número <span>*</span>
          </label>
          <InputMask
            mask="(99) 99999-9999"
            type="text"
            name="telefone"
            id="telefone"
            value={userData.telefone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cep">CEP</label>
          <InputMask
            mask="99999-999"
            type="text"
            name="cep"
            id="cep"
            value={userData.cep}
            onChange={handleInputChange}
            onBlur={handleCepBlur}
          />
          {cepLoading && <Loading />}
          {!cepValid && userData.cep && !cepLoading && (
            <span className="error-text">CEP inválido ou não encontrado</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input
            type="text"
            name="endereco"
            id="endereco"
            value={userData.endereco}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <button className="mainbutton1" onClick={handleSave}>
        Salvar alterações
      </button>
      {isSuccessModalOpen && (
        <div className="modal-overlay">
          <div className="modal-register">
            <FaCheckCircle className="modal-icon" />
            <p>{message}</p>
            <button onClick={toggleSuccessModal}>Fechar</button>
          </div>
        </div>
      )}

      {isErrorModalOpen && (
        <div className="modal-overlay">
          <div className="modal-register">
            <FaTimesCircle className="modal-icon-error" />
            <p>{error}</p>
            <button onClick={toggleErrorModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;