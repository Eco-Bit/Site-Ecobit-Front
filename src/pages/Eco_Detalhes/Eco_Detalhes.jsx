import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import EcoNav from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer.jsx';
import Loading from '../../components/Loading/Loading';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import "./Eco_Detalhes.css";

function EcoDetalhes() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const mapRef = useRef(null);
    const [mapLoading, setMapLoading] = useState(true);
    const [locationNotFound, setLocationNotFound] = useState(false);
    const [ponto, setPonto] = useState(null);
    const [map, setMap] = useState(null);
    const [approximateLocation, setApproximateLocation] = useState(false);

    // Use useParams para obter o parâmetro de ID da rota
    const { id } = useParams();

    useEffect(() => {
        fetchPontoDetails(id); // Use o ID da rota para buscar os detalhes do ponto
    }, [id]);

    const fetchPontoDetails = (Id) => {
        axios.get(`http://localhost:8080/getPontoId/${Id}`)
            .then(response => {
                setPonto(response.data);
                initMap(response.data.endererecoPonto, response.data.cep, response.data.nomePonto);
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do ponto:', error);
            });
    };

    const initMap = (endereco, numeroPonto, nomePonto) => {
        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: endereco }, (results, status) => {
            if (status === 'OK' && results[0]) {
                const { lat, lng } = results[0].geometry.location;
                createMap(lat(), lng(), nomePonto);
            } else {
                console.error('Geocode falhou devido a:', status);
                // Tentar novamente com o CEP
                geocoder.geocode({ address: nomePonto }, (results, status) => {
                    if (status === 'OK' && results[0]) {
                        const { lat, lng } = results[0].geometry.location;
                        createMap(lat(), lng(), nomePonto);
                        setApproximateLocation(true);
                    } else {
                        console.error('Geocode falhou novamente devido a:', status);
                        setLocationNotFound(true);
                        setMapLoading(false);
                    }
                });
            }
        });
    };

    const createMap = (lat, lng, nomePonto) => {
        const newMap = new window.google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 17.1,
            disableDefaultUI: true,
            draggable: false,
        });

        new window.google.maps.Marker({
            position: { lat, lng },
            map: newMap,
            title: nomePonto,
        });

        setMap(newMap);
        setMapLoading(false);
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
                        {mapLoading && !locationNotFound && <Loading />}
                        {locationNotFound ? (
                            <div className="map-error">
                                <FontAwesomeIcon icon={faFrown} size="3x" />
                                <p>Não foi possível encontrar esse local</p>
                            </div>
                        ) : (
                            <div id="map" ref={mapRef} className="map"></div>
                        )}
                    </div>
                    <div className="description">
                        <p className="title">Endereço:</p>
                        <p id="address">{ponto ? ponto.endererecoPonto + " - " + ponto.numeroPonto + " - Diadema, São Paulo" : 'Carregando...'}</p>
                        <p className="note">{ponto && ponto.abertoSabado ? ponto.abertoSabado : ''}</p>
                        {approximateLocation && <p>Mostrando local aproximado no mapa</p>}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default EcoDetalhes;
