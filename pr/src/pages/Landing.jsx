import { useNavigate } from "react-router-dom";
import "../Landing.css";

function Landing() {
    const navigate = useNavigate();

    return (
        <div className="landing-container">
            <div className="landing-content">
                <h1 className="landing-title">ENIGMAS</h1>
                <h2 className="landing-welcome-title">Bienvenido a la Base de Datos de Enigmas</h2>
                <div className="landing-glitch-line"></div>
                <p className="landing-subtitle">
                    "Hay secretos enterrados en la oscuridad... algunos jamás debieron ser descubiertos."
                </p>
                <p className="landing-description">
                    Este es un archivo confidencial e interactivo sobre los misterios más profundos del internet. Aquí podrás explorar expedientes clasificados de Cicada 3301, el juego perdido Crow 64 y el exploit clásico youareanidiot, investigar su lore histórico, descifrar códigos con herramientas de terminal en tiempo real y debatir hallazgos en el foro de agentes.
                </p>
                <button className="landing-btn" onClick={() => navigate("/login")}>
                    INGRESAR AL PORTAL
                </button>
            </div>

            <footer className="landing-footer">
                <div className="footer-line"></div>
                <div className="footer-info">
                    <span className="footer-detail-text">
                        ©2026 Esteban Ibañez, TI3031, Inacap, Programación front end, Víctor Armando Vásquez Muñoz.
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default Landing;
