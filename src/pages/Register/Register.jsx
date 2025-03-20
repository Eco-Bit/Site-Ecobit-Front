import React, { useState } from 'react';
import EcoNav from '../../components/Navbar/Navbar.jsx';
import axios from 'axios';
import Footer from '../../components/Footer/Footer.jsx';
import './Register.css';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Importe os ícones de check e times circle

function Register() {
    const navigate = useNavigate();
    const [isActive, setActive] = useState(false);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setErrorModalOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const toggleActive = () => {
        setActive(!isActive);
    };

    const toggleSuccessModal = () => {
        setSuccessModalOpen(!isSuccessModalOpen);
    };

    const toggleErrorModal = () => {
        setErrorModalOpen(!isErrorModalOpen);
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormState((prevState) => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSignUp = async () => {
        const { name, email, password, confirmPassword } = formState;

        if (password !== confirmPassword) {
            setError("Confira as senhas.");
            toggleErrorModal(); // Abre o modal de erro
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/save', {
                nome: name,
                email: email,
                senha: password
            });
            if (response.status === 201) {
                setMessage('Cadastrado com Sucesso!');
                toggleSuccessModal(); // Abre o modal de sucesso
                setError('');
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setError('Erro ao Cadastrar. Por favor, tente novamente.');
            toggleErrorModal(); // Abre o modal de erro
            setMessage('');
        }
    };

    const handleSignIn = async () => {
        const { email, password } = formState;

        try {
            const response = await axios.post('http://localhost:8080/login', {
                email: email,
                senha: password
            });
            if (response.status === 200) {
                const id = response.data.id; // Supondo que o servidor envie o ID do usuário após o login
                setMessage('Login bem-sucedido!');
                setError('');
                localStorage.setItem('id', id); // Armazenando o e-mail no localStorage
                navigate(`/user/accountsettings`);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Erro ao entrar. Confira seus dados.');
            toggleErrorModal();
            setMessage('');
        }
    };

    return (
        <div>
            <EcoNav />
            <div id="body">
                <div className={`container ${isActive ? 'active' : ''}`} id="container">
                    <div className="form-container sign-up">
                        <form>
                            <h1>Crie uma Conta</h1>
                            <div className="social-icons">
                                <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="icon"><i className="fab fa-github"></i></a>
                                <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>ou cadastre email e senha</span>
                            <input type="text" placeholder="Nome Completo" id="name" onChange={handleChange} />
                            <input type="email" placeholder="Email" id="email" onChange={handleChange} />
                            <input type="password" placeholder="Senha" id="password" onChange={handleChange} />
                            <input type="password" placeholder="Confirmar Senha" id="confirmPassword" onChange={handleChange} />
                            <button type='button' onClick={handleSignUp}>Cadastrar</button>
                        </form>
                    </div>
                    <div className="form-container sign-in">
                        <form>
                            <h1>Login</h1>
                            <div className="social-icons">
                                <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                                <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                                <a href="#" className="icon"><i className="fab fa-github"></i></a>
                                <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                            <span>ou use seu e-mail e senha</span>
                            <input type="email" placeholder="Email" id="email" onChange={handleChange} />
                            <input type="password" placeholder="Password" id="password" onChange={handleChange} />
                            <a href="#">Esqueceu sua senha?</a>
                            <button type='button' onClick={handleSignIn}>Entrar</button>
                        </form>
                    </div>
                    <div className="toggle-container">
                        <div className="toggle">
                            <div className={`toggle-panel toggle-left ${isActive ? '' : 'active'}`}>
                                <h1>Bem Vindo(a) de volta!</h1>
                                <p>Insira seus dados para acessar todo conteúdo do nosso site</p>
                                <button className="hidden" id="toggle-login" type='button' onClick={toggleActive}>Entrar</button>
                            </div>
                            <div className={`toggle-panel toggle-right ${isActive ? 'active' : ''}`}>
                                <h1>Não possui uma conta?</h1>
                                <p> Cadastre seus dados para ter acesso a todo nosso conteúdo</p>
                                <button className="hidden" id="toggle-register" type='button' onClick={toggleActive}>Cadastrar</button>
                            </div>
                        </div>
                    </div>
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
            </div>
            <Footer />
        </div>
    );
}

export default Register;
