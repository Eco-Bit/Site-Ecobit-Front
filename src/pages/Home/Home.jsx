import EcoNav from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import "./Home.css";
import Button from "../../components/HOME/Button/Button.jsx";
import Icon from "../../components/HOME/Icons/Icons.jsx";
import FloatingButton from "../../components/FloatingButton/FloatingButton.jsx";
import { useEffect , useState } from "react";

function ImageTitleDescription({
  imgSrc,
  alt,
  title,
  description,
  className,
  containerClassName,
}) {
  return (
    <div className={containerClassName}>
      <img src={imgSrc} alt={alt} className={className} />
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
}

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <div className="Home">
      <section>
        <EcoNav />
      </section>
      <section>
        <img
          className="bannerhomer"
          src="./src/img/Home.png"
          alt="BannerHome"
        />
      </section>
      <section className="gridHome">
        <div className="maisDoado">
          <h3>
            <b className="about-title">Itens mais Doados</b>
          </h3>
          <p className="about-description">Seja um doador ou aquele que quer a doação</p>
          <Button path={"/Donation"} />
        </div>
        <div className="blocos">
          <div className="destaques">
            <div>
              <img
                className="imgdestaques"
                src="./src/img/fotoHome1.png"
                alt="fotoHome1"
              />
            </div>
            <h6 className="about-description">Roupas</h6>
          </div>
          <div className="destaques">
            <div>
              <img
                className="imgdestaques"
                src="./src/img/fotoHome2.png"
                alt="fotoHome2"
              />
            </div>
            <h6 className="about-description">Móveis</h6>
          </div>
          <div className="destaques">
            <div>
              <img
                className="imgdestaques"
                src="./src/img/fotoHome3.png"
                alt="fotoHome3"
              />
            </div>
            <h6 className="about-description">Eletrodoméstico</h6>
          </div>
        </div>
      </section>
      <section>
      <section className="about1">
          <header className="about-header">
            <h2 className="about-title">Sobre</h2>
            <p className="about-description">
              Plataforma para achar o destino correto para suas coisas paradas
            </p>
          </header>
          <section className="about-content">
            <ImageTitleDescription
              imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/e171bf44d2714de163bb056f3f7228516a057f99e2b814fa7ab73ad8b974d761?apiKey=ef4aee14eef14d0085cea41906673191&"
              alt="Ajude o planeta Image"
              title="Ajude o planta"
              description="Recicle aqueles materiais e lixos que você não sabe o destino correto"
              className="about-image"
              containerClassName="about-item"
            />
            <ImageTitleDescription
              imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/96af7e33813a52b43724d20e6017665ba98cf1ab4e2a9484e5c9a5e3f60367dd?apiKey=ef4aee14eef14d0085cea41906673191&"
              alt="Empacote Image"
              title="Empacote"
              description="Encontre o local correto e as pessoas que precisam da sua doação"
              className="about-image"
              containerClassName="about-item"
            />
            <ImageTitleDescription
              imgSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/aafa57c6cd9f1e729548bdd9b390a1ac0f3fd3e51be81b0fdfe50304a382398f?apiKey=ef4aee14eef14d0085cea41906673191&"
              alt="Procure Image"
              title="Procure"
              description="Procure por doações disponível, ONGs e local de coleta do município"
              className="about-image"
              containerClassName="about-item"
            />
          </section>
        </section>
        <section className="eco">
        <div className="blocos2">
          <div className="destaques">
            <div>
              <img
                className="imgdestaques"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/43cee0aefc2eba344d99c27fbd275f8902076b65615e62302f9d3b1ffcdc712e?apiKey=ef4aee14eef14d0085cea41906673191&"
                alt="fotoHome1"
              />
            </div>
            <h6 className="about-description">Ponto de Coletas</h6>
          </div>
          <div className="destaques">
            <div>
              <img
                className="imgdestaques"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c8a550c50e97a23c913d8303c5d4feb2f341516b6b8b03c2bd8c57569dc45447?apiKey=ef4aee14eef14d0085cea41906673191&"
                alt="fotoHome2"
              />
            </div>
            <h6 className="about-description">Coleta seletiva</h6>
          </div>
          <div className="destaques">
            <div>
              <img
                className="imgdestaques"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b5b1f3164c0ed60be8ecd6327df43a926d018d7c77b6d38190ede97218e70476?apiKey=ef4aee14eef14d0085cea41906673191&"
                alt="fotoHome3"
              />
            </div>
            <h6 className="about-description">Ecopontos</h6>
          </div>
        </div>
        </section>
        <div className="but-baixo">
        <Button path={"/Ecopontos"} />
        </div>
        
      </section>
      <Footer />
    </div>
  );
}

export default Home;
