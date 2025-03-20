import React, { useState, useEffect } from 'react';
import EcoNav from "../../components/Navbar/Navbar.jsx";
import Footer from '../../components/Footer/Footer.jsx'
import "./EcopontoForm.css";
import { FaCheckCircle } from 'react-icons/fa';

function EcopontoForm() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [nomePonto, setNomePonto] = useState('');
    const [materiaisPonto, setMateriaisPonto] = useState('');
    const [enderecoPonto, setEnderecoPonto] = useState('');
    const [numeroPonto, setNumeroPonto] = useState('');
    const [abertoSabado, setAbertoSabado] = useState('');

    function handleNomeChange(event) {
        setNomePonto(event.target.value);
    }

    function handleMaterialChange(event) {
        setMateriaisPonto(event.target.value);
    }

    function handleEnderecoChange(event) {
        setEnderecoPonto(event.target.value);
    }

    function handleNumeroChange(event) {
        setNumeroPonto(event.target.value);
    }

    function handleAbertoSabadoChange(event) {
        setAbertoSabado(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        
        const pontoData = {
            nomePonto: nomePonto,
            materiasPonto: materiaisPonto,
            endererecoPonto: enderecoPonto,
            numeroPonto: numeroPonto,
            abertoSabado: abertoSabado
        };

        try {
            const response = await fetch('http://localhost:8080/savePonto', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(pontoData)
            });

            if (response.ok) {
                setShowConfirmationModal(true);
                setTimeout(() => {
                    setShowConfirmationModal(false);
                    setNomePonto('');
                    setMateriaisPonto('');
                    setEnderecoPonto('');
                    setNumeroPonto('');
                    setAbertoSabado('');
                }, 2000);
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="ecoponto-form-container">
            <EcoNav />
            <div className="EcopontoForm-forms">
                <div className="EcopontoForm-forms-container">
                    <div className="EcopontoForm-forms-header">
                        <h1 className="EcopontoForm-forms-title">Novo Ecoponto</h1>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="EcopontoForm-forms-form-group">
                            <input type="text" id="nomePonto" className="EcopontoForm-forms-input-field" placeholder="Nome" value={nomePonto} onChange={handleNomeChange} required />
                        </div>
                        <div className="EcopontoForm-forms-form-group">
                            <input type="text" id="materiaisPonto" className="EcopontoForm-forms-input-field" placeholder="Material" value={materiaisPonto} onChange={handleMaterialChange} required />
                        </div>
                        <div className="EcopontoForm-forms-form-group">
                            <input type="text" id="enderecoPonto" className="EcopontoForm-forms-input-field" placeholder="Endereço" value={enderecoPonto} onChange={handleEnderecoChange} required />
                        </div>
                        <div className="EcopontoForm-forms-form-group">
                            <input type="text" id="numeroPonto" className="EcopontoForm-forms-input-field" placeholder="CEP" value={numeroPonto} onChange={handleNumeroChange} required />
                        </div>
                        <div className="EcopontoForm-forms-form-group">
                            <select id="abertoSabado" className="EcopontoForm-forms-select-field" value={abertoSabado} onChange={handleAbertoSabadoChange} required>
                                <option value="" disabled>Abre aos sábados?</option>
                                <option value="Aberto aos Sábados">Sim</option>
                                <option value="Fechado aos Sábados">Não</option>
                            </select>
                        </div>
                        <input type="submit" value="Enviar" className="EcopontoForm-forms-submit-btn" />
                    </form>
                </div>
            </div>
            {showConfirmationModal && (
                <div className="EcopontoForm-modal active">
                    <div className="EcopontoForm-modal-content">
                        <FaCheckCircle className="EcopontoForm-modal-icon" />
                        <p>Ecoponto Cadastrado com Sucesso!</p>
                        <p>Obrigado!</p>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default EcopontoForm;
