import { useState } from 'react';
import EcoNav from '../../components/Navbar/Navbar.jsx'
import "./Register.css";

function Register() {

    const [action, setAction] = useState("Cadastre-se")

    return (
        <div className="Register">
            <EcoNav />
            <form action="submit">
                <div className="container">
                    <div className="header">
                        <div className="text">{action}</div>
                        <div className="underline"></div>
                    </div>
                    <div className="submit-container">
                        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Cadastre-se") }}>Cadastrar</div>
                        <div className={action === "Cadastre-se" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
                    </div>
                    <div className="inputs">
                        {action === "Login" ? <div /> : <div className="input">
                            <i className="fa fa-user"></i>
                            <input type="text" placeholder='Nome' name="name" id="name" required />
                        </div>}
                        <div className="input">
                            <i className="fa fa-at"></i>
                            <input type="email" placeholder='e-Mail' name="email" id="email" required />
                        </div>
                        <div className="input">
                            <i className="fa fa-lock"></i>
                            <input type="password" placeholder='Senha' name="password" id="password" required />
                        </div>
                        {action === "Login" ? <div /> : <div className="input">
                            <i></i>
                            <input type="password" placeholder='Confirmar Senha' name="password" id="confirm-password" required />
                        </div>}
                        {action === "Cadastre-se" ? <div /> : <div className="forgot-password">Esqueceu sua senha? <span>Clique Aqui!</span></div>}
                        <div className="submit-container">
                        </div>
                    </div>
                    <div className="submit-container">
                        <button className="submit" type='submit'>Cadastrar</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Register;
