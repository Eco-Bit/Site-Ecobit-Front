import React from 'react';
import './Loading.css';

function Loading() {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Carregando...</p>
        </div>
    );
}

export default Loading;