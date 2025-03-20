import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AccountSettings.css';

const AccountSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    cep: '',
    senha: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const chave = localStorage.getItem('id');
        if (!chave) {
          throw new Error('ID do usuário não encontrado no localStorage');
        }
        const response = await fetch(`http://localhost:8080/getUserId/${chave}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar os dados do usuário');
        }
        const userDataFromBackend = await response.json();
        setUserData(userDataFromBackend);
      } catch (error) {
        console.error('Erro ao buscar os dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const chave = localStorage.getItem('id');
      if (!chave) {
        throw new Error('ID do usuário não encontrado no localStorage');
      }

      const response = await fetch(`http://localhost:8080/updateUser/${chave}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar os dados do usuário');
      }

      navigate('/user/accountsettings');
    } catch (error) {
      console.error('Erro ao atualizar os dados do usuário:', error);
    }
  };

  return (
    <div className="accountsettings">
      <h1 className="mainhead1">Informações Pessoais</h1>

      <div className="form">
        <div className="form-group">
          <label htmlFor="nome">Seu nome <span>*</span></label>
          <input type="text" name="nome" id="nome" value={userData.nome} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="telefone">Número <span>*</span></label>
          <input type="text" name="telefone" id="telefone" value={userData.telefone} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email <span>*</span></label>
          <input type="email" name="email" id="email" value={userData.email} onChange={handleInputChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="endereco">Endereço</label>
          <input type="text" name="endereco" id="endereco" value={userData.endereco} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="cep">CEP</label>
          <input type="text" name="cep" id="cep" value={userData.cep} onChange={handleInputChange} />
        </div>

      
        <div className="form-group">
          <label htmlFor="novaSenha">Nova Senha</label>
          <input type="password" name="senha" id="senha" value={userData.senha} onChange={handleInputChange} />
        </div>
      </div>

      <button className="mainbutton1" onClick={handleSave}>Salvar alterações</button>
    </div>
  );
};

export default AccountSettings;
