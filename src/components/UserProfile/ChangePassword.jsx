import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    useEffect(() => {
        fetchOldPassword();
    }, []); // Chamada apenas uma vez no carregamento inicial do componente

    const fetchOldPassword = async () => {
        try {
            const userId = localStorage.getItem('id');
            const response = await axios.get(`http://localhost:8080/getUserId/${userId}`);
            // Se a senha estiver presente na resposta, defina-a como a senha antiga
            if (response.data && response.data.senha) {
                setOldPassword(response.data.senha);
            } else {
                console.error('Senha não encontrada para o usuário');
            }
        } catch (error) {
            console.error('Erro ao obter senha antiga:', error);
        }
    };

    const handleChangePassword = async () => {
        try {
            const userId = localStorage.getItem('id');
            const response = await axios.put(`http://localhost:8080/updateUser/${userId}`, {
                senha: newPassword
            });
            console.log(response.data); 
            alert('Senha alterada com sucesso!');
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            alert('Erro ao alterar senha. Por favor, tente novamente.');
        }
    };

    return (
        <div className='accountsettings'>
            <h1 className='mainhead1'>Mudar Senha</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='oldpass'>Senha Antiga <span>*</span></label>
                    <input 
                        type="password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='newpass'>Nova Senha <span>*</span></label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                    />
                </div>
            </div>

            <button className='mainbutton1' onClick={handleChangePassword}>
                Salvar Alterações
            </button>
        </div>
    );
}

export default ChangePassword;
