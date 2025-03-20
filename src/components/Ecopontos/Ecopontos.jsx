import React from 'react';
import './Ecopontos.css';
import { NavLink } from 'react-router-dom';

const Ecopontos = ({ ecopoint }) => {
    return (
        <div className='ecopoint'>
            <br />
            <div className='all_content'>
                <i className="glyphicon glyphicon-map-marker"></i>
                <div className="content">
                    <p className='ecopoint_name'>{ecopoint.nome}</p>
                    <p className="neighborhood">{ecopoint.bairro}</p>
                    <p className="city">({ecopoint.cidade})</p>
                    <p className="saturday">{ecopoint.sabado}</p>
                </div>
                <div>
                    <NavLink to="/Eco_Detalhes" className='btn btn-success'>Detalhes</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Ecopontos