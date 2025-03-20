import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EcoNav from "../../components/Navbar/Navbar.jsx";
import "./ProductForm.css";
import { FaCheckCircle, FaRegSmileWink } from 'react-icons/fa';
import { MdOutlineAddToPhotos } from "react-icons/md";
import InputMask from 'react-input-mask';
import Footer from '../../components/Footer/Footer.jsx';
import axios from 'axios';

function ProductForm() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const navigate = useNavigate();

    const userId = localStorage.getItem("id");
    const [images, setImages] = useState([]);
    const [quantidade, setQuantidade] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoria, setCategoria] = useState('');
    const [condicao, setCondicao] = useState('');
    const [disponibilidade, setDisponibilidade] = useState('');
    const [telefone, setTelefone] = useState(''); // Novo estado para o telefone
    const [aceitoUsoTelefone, setAceitoUsoTelefone] = useState(false); // Novo estado para o checkbox
    const [error, setError] = useState('');
    const [handleButtonDisabled, setHandleButtonDisabled] = useState(false);

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    async function handleImageChange(e) {
        const files = Array.from(e.target.files);
        const imagePreviews = await Promise.all(files.map(async (file) => {
            const base64 = await convertToBase64(file);
            return {
                file,
                src: base64,
                id: Math.random().toString(36).substr(2, 9),
            };
        }));

        setImages((prevImages) => [...prevImages, ...imagePreviews]);
        setHandleButtonDisabled(true);
    }

    
    useEffect(() => {
        setHandleButtonDisabled(images.length >= 5);
    }, [images]);

    function removeImage(id) {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
        setHandleButtonDisabled(false);
    }

    function handleQuantidadeChange(event) {
        setQuantidade(event.target.value);
    }

    function handleTituloChange(event) {
        setTitulo(event.target.value);
    }

    function handleDescricaoChange(event) {
        setDescricao(event.target.value);
    }

    function handleCategoriaChange(event) {
        setCategoria(event.target.value);
    }

    function handleCondicaoChange(event) {
        setCondicao(event.target.value);
    }

    function handleDisponibilidadeChange(event) {
        setDisponibilidade(event.target.value);
    }

    function handleTelefoneChange(event) {
        setTelefone(event.target.value);
    }

    function handleAceitoUsoTelefoneChange(event) {
        setAceitoUsoTelefone(event.target.checked);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (images.length === 0) {
            setError('Por favor, adicione ao menos uma imagem.');
            return;
        }
        if (!telefone) {
            setError('Por favor, insira um número de celular válido.');
            return;
        }
        if (!aceitoUsoTelefone) {
            setError('Você deve aceitar o uso do seu telefone pela plataforma.');
            return;
        }

        const imagensBase64 = images.map(image => image.src);

        const doacao = {
            userId,
            titulo,
            descricao,
            quantidade,
            categoria,
            condicao,
            disponibilidade,
            telefone,
            imagensBase64
        };

        try {
            const response = await axios.post('http://localhost:8080/saveDoa', doacao, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setShowConfirmationModal(true);
            setTimeout(() => {
                setShowConfirmationModal(false);
                setImages([]);
                setQuantidade('');
                setTitulo('');
                setDescricao('');
                setCategoria('');
                setCondicao('');
                setDisponibilidade('');
                setTelefone(''); // Limpa o campo de telefone após submissão
                setAceitoUsoTelefone(false); // Reseta o checkbox após submissão
            
                navigate(`/user/accountsettings`)
                
            }, 2000);
        } catch (error) {
            setError('Erro ao enviar a doação. Por favor, tente novamente.');
        }
    }

    return (
        <div>
            <EcoNav />
            <div className="ProductForm-forms">
                <div className="ProductForm-forms-container">
                    <div className="ProductForm-forms-header">
                        <h1 className="ProductForm-forms-title">Nova Doação</h1>
                    </div>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <div className="ProductForm-forms-form">
                            <p>*Todos os campos são obrigatórios</p>
                            <h2>Adicione fotos da sua doação <FaRegSmileWink /></h2>
                            <div className="ProductForm-forms-image-container">
                                {images.map(image => (
                                    <div key={image.id} className="ProductForm-forms-image-preview">
                                        <img src={image.src} alt="Imagem" className="ProductForm-forms-preview-image" />
                                        <button type="button" onClick={() => removeImage(image.id)} className="ProductForm-forms-remove-button">X</button>
                                    </div>
                                ))}
                                {!handleButtonDisabled && (
                                    <label className="ProductForm-forms-add-image">
                                        <MdOutlineAddToPhotos className="ProductForm-forms-add-icon" />
                                        <span>Adicionar foto</span>
                                        <input type="file" accept="image/*" id="images" multiple onChange={handleImageChange} className="ProductForm-forms-input-file" />
                                    </label>
                                )}
                            </div>
                        </div>
                        <div className="error-message" style={{ display: error ? 'block' : 'none' }}>
                            {error}
                        </div>
                        <br />
                        <div className="ProductForm-forms-form-group">
                            <input type="text" id="titulo" className="ProductForm-forms-input-field" placeholder="Título" value={titulo} onChange={handleTituloChange} required />
                        </div>
                        <div className="ProductForm-forms-form-group-inline">
                            <InputMask
                                mask="(99) 99999-9999"
                                id="telefone"
                                className="ProductForm-forms-input-field ProductForm-forms-input-field-telefone"
                                placeholder="Celular"
                                value={telefone}
                                onChange={handleTelefoneChange}
                                required
                            />
                            <label className="ProductForm-forms-checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={aceitoUsoTelefone}
                                    onChange={handleAceitoUsoTelefoneChange}
                                    className="ProductForm-forms-checkbox"
                                    required
                                />
                                Aceito o uso do meu telefone pela plataforma
                            </label>
                        </div>
                        <div className="ProductForm-forms-form-group">
                            <div className="ProductForm-forms-input-field-container">
                                <input type="number" id="quantidade" className="ProductForm-forms-input-field" placeholder="Quantidade" required min="1" value={quantidade} onInput={handleQuantidadeChange} />
                            </div>
                            <div className="ProductForm-forms-input-field-container">
                                <select name="categoria" id="categoria" className="ProductForm-forms-input-field" required value={categoria} onChange={handleCategoriaChange}>
                                    <option value="" disabled>Categoria</option>
                                    <option value="Móvel">Móvel</option>
                                    <option value="Roupa">Roupa</option>
                                    <option value="Eletrônico">Eletrônico</option>
                                    <option value="Eletrodoméstico">Eletrodoméstico</option>
                                </select>
                            </div>
                        </div>
                        <div className="ProductForm-forms-form-group">
                            <select name="condicao" id="condicao" className="ProductForm-forms-input-field" required value={condicao} onChange={handleCondicaoChange}>
                                <option value="" disabled>Condição</option>
                                <option value="Novo">Novo</option>
                                <option value="Usado - estado de novo">Usado - estado de novo</option>
                                <option value="Usado - em boas condições">Usado - em boas condições</option>
                                <option value="Usado - em condições razoáveis">Usado - em condições razoáveis</option>
                            </select>
                        </div>
                        <div className="ProductForm-forms-form-group">
                            <label htmlFor="disponibilidade">Tem disponibilidade para levar até o interessado?</label>
                            <select name="disponibilidade" id="disponibilidade" className="ProductForm-forms-input-field" required value={disponibilidade} onChange={handleDisponibilidadeChange}>
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                            </select>
                        </div>
                        <div className="ProductForm-forms-form-group">
                            <textarea type="text" id="descricao" className="ProductForm-forms-input-field" placeholder="Descrição" value={descricao} onChange={handleDescricaoChange} required/>
                        </div>
                        <input type="submit" value="Enviar" className="ProductForm-forms-submit-btn" />
                    </form>
                </div>
            </div>
            {showConfirmationModal && (
                <div className="modal active">
                    <div className="modal-content">
                        <FaCheckCircle className="modal-icon" />
                        <p>Doação cadastrada com sucesso!</p>
                        <p>Obrigado! Você está ajudando alguém!</p>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default ProductForm;
