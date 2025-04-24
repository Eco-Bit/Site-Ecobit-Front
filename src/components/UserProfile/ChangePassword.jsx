import React, { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);

    const toggleSuccessModal = () => {
        setSuccessModalOpen(!isSuccessModalOpen);
    };

    const toggleErrorModal = () => {
        setErrorModalOpen(!isErrorModalOpen);
    };

    const handleChangePassword = async () => {
        try {
            const userId = localStorage.getItem('id');

            if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
                setError('Preencha todos os campos');
                toggleErrorModal();
                return;
            }

            if (newPassword !== confirmPassword) {
                setError('A confirmação de senha não confere com a nova senha');
                toggleErrorModal();
                return;
            }

            if (oldPassword === newPassword) {
                setError('A nova senha não pode ser igual à antiga');
                toggleErrorModal();
                return;
            }

            const response = await axios.put(`http://localhost:8080/updateSenha/${userId}`, {
                senhaAtual: oldPassword,
                novaSenha: newPassword
            });

            setMessage('Senha alterada com sucesso!');
            toggleSuccessModal();
            setError('');
            console.log(response.data);
        } catch (error) {
            const msg = error.response?.data || 'Erro ao alterar senha';
            setError(msg);
            toggleErrorModal();
            setMessage('');
            console.error('Erro ao alterar senha:', error);
        }
    };

    return (
        <div className='accountsettings'>
            <h1 className='mainhead1'>Alterar Senha</h1>

            <div className='form'>
                <div className='form-group'>
                    <label htmlFor='oldpass'>Senha Atual <span>*</span></label>
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

                <div className='form-group'>
                    <label htmlFor='confirmpass'>Confirme a Nova Senha <span>*</span></label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                </div>
            </div>

            <button className='mainbutton1' onClick={handleChangePassword}>
                Salvar Alterações
            </button>

            {/* Modal de sucesso */}
            {isSuccessModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-register">
                        <FaCheckCircle className="modal-icon" />
                        <p>{message}</p>
                        <button onClick={toggleSuccessModal}>Fechar</button>
                    </div>
                </div>
            )}

            {/* Modal de erro */}
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

export default ChangePassword;
