import React from 'react';
import './Ecopontos.css';
import Button from 'react-bootstrap/Button';

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
                    <Button className='btn btn-success'>Detalhes</Button>
                </div>
            </div>
        </div>
    )
}

export default Ecopontos
