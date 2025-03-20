import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import EcoNav from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer.jsx';
import Loading from '../../components/Loading/Loading';
import axios from 'axios'; 
import "./Eco_Detalhes.css";

function EcoDetalhes() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const mapRef = useRef(null);
    const [mapLoading, setMapLoading] = useState(true);
    const [ponto, setPonto] = useState(null);
    const [map, setMap] = useState(null);

    // Use useParams para obter o parâmetro de ID da rota
    const { id } = useParams();

    useEffect(() => {
        fetchPontoDetails(id); // Use o ID da rota para buscar os detalhes do ponto
    }, [id]);

    const fetchPontoDetails = (Id) => {
        axios.get(`http://localhost:8080/getPontoId/${Id}`)
            .then(response => {
                setPonto(response.data);
                initMap(response.data.endererecoPonto, response.data.nomePonto);
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do ponto:', error);
            });
    };

    const initMap = (endereco, nomePonto) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: endereco }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const { lat, lng } = results[0].geometry.location;

                const newMap = new window.google.maps.Map(mapRef.current, {
                    center: { lat: lat(), lng: lng() },
                    zoom: 17.1,
                    disableDefaultUI: true,
                    draggable: false,
                });

                new window.google.maps.Marker({
                    position: { lat: lat(), lng: lng() },
                    map: newMap,
                    title: nomePonto,
                });

                setMap(newMap);
                setMapLoading(false);
            } else {
                console.error('Geocode falhou devido a:', status);
            }
        });
    };

    return (
        <div className='eco-container'>
            <EcoNav />
            <div className='eco-header'>
                <h2 id="eco_name">{ponto ? ponto.nomePonto : 'Carregando...'}</h2>
            </div>
            <div className="det_body">
                <div className="details-container">
                    <div className="map-container">
                        {mapLoading && <Loading />}
                        <div id="map" ref={mapRef} className="map"></div>
                    </div>
                    <div className="description">
                        <p className="title">Endereço:</p>
                        <p id="address">{ponto ? ponto.endererecoPonto : 'Carregando...'}</p>
                        <p className="title">CEP:</p>
                        <p>{ponto ? ponto.numeroPonto : 'Carregando...'}</p>
                        <p>{ponto ? ponto.cep : 'Carregando...'}</p>
                        <p className="note">{ponto && ponto.abertoSabado ? ponto.abertoSabado : ''}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EcoDetalhes;
