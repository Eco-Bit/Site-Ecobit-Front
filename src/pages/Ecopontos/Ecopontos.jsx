import { useState } from 'react';
import "./Ecopontos.css";
import Ecopontos from '../../components/Ecopontos/Ecopontos.jsx';
import EcoNav from '../../components/Navbar/Navbar.jsx'

function Home() {
  const [todos, setTodos] = useState([
    {
      "nome": "Ecoponto Arco-Íris",
      "endereco": "Rua Mozart, s/nº",
      "bairro": "Jardim Arco-Íris",
      "cidade": "Diadema",
      "cep": "09960-590",
      "sabado": "* Aberto aos Sábados"
    },
    {
      "nome": "Ecoponto Arraia",
      "endereco": "Rua Arraia, 50",
      "bairro": "Eldorado",
      "cidade": "Diadema",
      "cep": "09972-070",
      "sabado": "* Aberto aos Sábados"
    },
    {
      "nome": "Ecoponto Marginal “Z”",
      "endereco": "Avenida Daniel José de Carvalho, 330",
      "bairro": "Parque Real",
      "cidade": "Diadema",
      "cep": "09992-110",
      "sabado": "* Aberto aos Sábados"
    },
    {
      "nome": "Ecoponto Nações",
      "endereco": "Rua Espanha c/ Avenida Dom João VI",
      "bairro": "Taboão",
      "cidade": "Diadema",
      "cep": "09941-010",
      "sabado": "* Aberto aos Sábados"
    },
    {
      "nome": "Ecoponto Naval",
      "endereco": "Rua Idealópolis c/ Avenida Corredor ABD, s/nº",
      "bairro": "Vila São José",
      "cidade": "Diadema",
      "cep": "09950-580",
      "sabado": "* Aberto aos Sábados"
    },
    {
      "nome": "Ecoponto Rufino",
      "endereco": "Estrada do Rufino, 1.059",
      "bairro": "Serraria",
      "cidade": "Diadema",
      "cep": "09980-280",
      "sabado": "* Aberto aos Sábados"
    },
    {
      "nome": "Ecoponto Yamagata",
      "endereco": "Rua Yamagata c/ Rua Osaka, s/nº",
      "bairro": "Jardim Canhema",
      "cidade": "Diadema",
      "cep": "09940-220",
      "sabado": "* Aberto aos Sábados"
    },
    {
      "nome": "Ecoponto João Batista (Vila Nogueira)",
      "endereco": "Rua João Batista Alves do Nascimento, 546",
      "bairro": "Vila Nogueira",
      "cidade": "Diadema",
      "cep": "04905-020",
      "sabado": "* Aberto aos Sábados"
    },
    {
      "nome": "Ecoponto DLU",
      "endereco": "Avenida Pirâmide, 844",
      "bairro": "Jardim Inamar",
      "cidade": "Diadema",
      "cep": "09970-330",
      "sabado": "* Aberto aos Sábados"
    },
    {
      "nome": "Ecoponto Caracas",
      "endereco": "Rua Caracas, 120",
      "bairro": "Vila Mulford",
      "cidade": "Diadema",
      "cep": "09921-000",
    },
    {
      "nome": "Ecoponto Nova Conquista",
      "endereco": "Travessa ETCD, 210 – Vila Nova Conquista",
      "bairro": "Piraporinha",
      "cidade": "Diadema",
      "cep": "09950690",
    },
    {
      "nome": "Ecoponto Okavango – Casa Grande",
      "endereco": "Avenida Casa Grande, 1810",
      "bairro": "Jardim Casa Grande",
      "cidade": "Diadema",
      "cep": "09960-590",
    },
    {
      "nome": "Ecoponto Maria Leonor – Parque Reid / Campanário",
      "endereco": "Avenida Maria Leonor",
      "bairro": "Campanário",
      "cidade": "Diadema",
      "cep": "09920-080"
    }


  ]);

  return (
    <div className="Ecopontos">
      <EcoNav />
      <h1>Ecopontos</h1>
      <div className="eco-grid">
        {todos.map((ecopoint, index) => (
          <div key={index} className="eco-item">
            <Ecopontos ecopoint={ecopoint} />
          </div>
        ))}
        
      </div>
      
    </div>


  )
}

export default Home;
