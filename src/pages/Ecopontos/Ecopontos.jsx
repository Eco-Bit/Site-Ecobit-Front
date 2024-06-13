import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EcoNav from '../../components/Navbar/Navbar.jsx';
import './Ecopontos.css';
import { NavLink } from 'react-router-dom';
import FloatingButton from '../../components/FloatingButton/FloatingButton.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import DeleteButton from '../../components/DeleteButtonPonto/DeleteButtonPonto.jsx'

function Ecopontos() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [pontos, setPontos] = useState([]);

    useEffect(() => {
        const id = localStorage.getItem("id");
        setIsLoggedIn(!!id);
        if (id === "2") {
            setIsAdmin(true);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/getAllPontos')
            .then(response => {
                setPontos(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the pontos!', error);
            });
    }, []);

    return (
        <div>
            <EcoNav />
            <div className="Donation">
                <div className='headers'>
                    <h1 className="titles">Ecopontos</h1>
                    <p>Descartes corretos próximos de você</p>
                </div>
                <div className='product-container'>
                    {pontos.map(ponto => (
                        <div className='product-card' key={ponto.id}>
                            {localStorage.getItem('id') ==="665f5e2c1ddca82b275a70eb" && <DeleteButton id={ponto.id}/>}
                            <h2>{ponto.nomePonto}</h2>
                            <br></br>
                            <h3>Endereço:</h3>
                            <p>{ponto.endererecoPonto}</p>
                            <h3>Cep:</h3>
                            <br></br>
                            <p> {ponto.numeroPonto}</p>
                            <NavLink to={`/Eco_Detalhes/${ponto.id}`} className='NavLink'>Detalhes</NavLink>
                        </div>
                    ))}
                </div>
                {isLoggedIn ? <FloatingButton /> : ''}
            </div>
            <Footer />
        </div>
    );
}

export default Ecopontos;
