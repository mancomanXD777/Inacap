import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Lore.css";

const LORE_DATA = {
    cicada3301: {
        title: "Cicada 3301",
        image: "/cicada3301.jpg",
        subtitle: "El enigma criptográfico más complejo de la red",
        lore: "Cicada 3301 comenzó el 5 de enero de 2012 con una simple imagen publicada en 4chan que contenía un texto oculto. El grupo autodenominado 'Cicada 3301' afirmó estar buscando 'individuos altamente inteligentes' y para ello diseñó una serie de acertijos complejos que integraban criptografía, esteganografía, literatura clásica y runas nórdicas. El misterio creció cuando las pistas llevaron a ubicaciones del mundo real (desde Boston hasta Varsovia) donde los participantes debían escanear códigos QR en postes telefónicos.",
        resolution: "La comunidad global unió fuerzas para descifrar cada etapa. La primera imagen contenía un mensaje oculto legible al abrir el archivo con un editor de texto. Posteriormente, se utilizaron sistemas de cifrado César, cifrado de clave pública PGP para verificar la autenticidad de las pistas legítimas (evitando impostores), y el análisis de libros raros para extraer claves. Aunque algunos aseguran haber completado los acertijos y haber sido reclutados, el propósito final del grupo sigue siendo un misterio.",
        toolTitle: "Decodificador de Cifrado César (ROT)",
        toolDesc: "Utilizado por Cicada para esconder los primeros mensajes. Desplaza cada letra del alfabeto por un número fijo de posiciones.",
        interactiveComponent: "caesar"
    },
    crow64: {
        title: "Crow 64",
        image: "/crow64.jpg",
        subtitle: "El juego maldito de Nintendo 64 que nunca existió",
        lore: "Catastrophe Crow! (o Crow 64) es el mito de un videojuego de plataformas en 3D desarrollado a finales de los 90 para la Nintendo 64 por la compañía Opus Interactive, dirigida por Manfred Lorenz. Tras la extraña desaparición de Lorenz y el cierre de la empresa, el juego fue cancelado. Décadas más tarde, un canal de YouTube comenzó a subir gameplays reales del prototipo, mostrando un entorno de pesadilla, fallos en la física y tumbas virtuales dedicadas a los hijos fallecidos de Lorenz.",
        resolution: "Este ARG (Juego de Realidad Alternativa) fue resuelto analizando cada frame y pista en los videos subidos a YouTube. Los investigadores encontraron códigos binarios ocultos en las descripciones, audios invertidos que revelaban grabaciones espeluznantes y mensajes codificados mediante el alfabeto morse y cifrado Vigenère. La comunidad logró reconstruir la trágica y misteriosa historia ficticia detrás del desarrollo del juego y la desesperación de su creador.",
        toolTitle: "Traductor de Código Binario",
        toolDesc: "El juego escondía mensajes binarios en sus descripciones. Escribe tu texto para convertirlo a binario o viceversa.",
        interactiveComponent: "binary"
    },
    youareanidiot: {
        title: "You Are An Idiot",
        image: "/youareanidiot.jpg",
        subtitle: "El exploit del navegador que aterrorizó a los usuarios",
        lore: "A principios de los años 2000, la página 'youareanidiot.org' se convirtió en una pesadilla viral. Al ingresar, el usuario era recibido con un coro alegre que cantaba repetidamente 'You are an idiot!' y smileys parpadeando agresivamente en blanco y negro. Si el usuario intentaba cerrar la ventana del navegador, el script detectaba el evento y abría hasta 6 ventanas flotantes más que rebotaban caóticamente por la pantalla, provocando que la computadora se congelara por el consumo de RAM.",
        resolution: "La resolución de este virus no requirió criptografía avanzada, sino ingeniería de software y el desarrollo de mejores navegadores. La comunidad de programadores analizó el código fuente HTML/JS y descubrió el uso de bucles infinitos empleando 'window.open()' y la manipulación del evento 'onbeforeunload'. Para neutralizarlo, los usuarios desactivaban JavaScript en sus navegadores o forzaban el cierre del sistema. Esta amenaza impulsó a navegadores como IE, Firefox y Chrome a bloquear permanentemente ventanas emergentes no deseadas creadas por scripts repetitivos.",
        toolTitle: "Simulador de Comportamiento Bouncing (Seguro)",
        toolDesc: "Simulación controlada de cómo las ventanas emergentes rebotaban por la pantalla sin salir de esta caja segura ni afectar tu sistema.",
        interactiveComponent: "bouncing"
    }
};

function Lore() {
    const { id } = useParams();
    const navigate = useNavigate();
    const enigma = LORE_DATA[id];

    // Caesar States
    const [caesarInput, setCaesarInput] = useState("BIENVENIDO A ENIGMAS");
    const [caesarShift, setCaesarShift] = useState(3);

    // Binary States
    const [binaryInput, setBinaryInput] = useState("HACKER");
    const [binaryOutput, setBinaryOutput] = useState("");

    // Bouncing States
    const [isBouncing, setIsBouncing] = useState(false);
    const [smileyPos, setSmileyPos] = useState({ x: 50, y: 50, dx: 3, dy: 4 });

    if (!enigma) {
        return (
            <div className="error-lore-container">
                <h2>Enigma no encontrado</h2>
                <button onClick={() => navigate("/home")}>Volver</button>
            </div>
        );
    }

    // Caesar Logic
    const runCaesar = (str, shift) => {
        return str
            .toUpperCase()
            .split("")
            .map((char) => {
                const code = char.charCodeAt(0);
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 + shift) % 26) + 65);
                }
                return char;
            })
            .join("");
    };

    // Binary Logic
    const stringToBinary = (str) => {
        return str
            .split("")
            .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
            .join(" ");
    };

    // Safe Bouncing Simulation
    const toggleBouncing = () => {
        setIsBouncing(!isBouncing);
    };

    return (
        <div className="lore-page-container">
            <header className="lore-header" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), #050505), url(${enigma.image})` }}>
                <div className="lore-header-content">
                    <button className="back-btn" onClick={() => navigate("/home")}>
                        ← Volver al Portal
                    </button>
                    <h1 className="lore-title">{enigma.title}</h1>
                    <p className="lore-subtitle-text">{enigma.subtitle}</p>
                </div>
            </header>

            <main className="lore-main-content">
                <section className="lore-section card-style">
                    <h2><span className="accent-bullet">#</span> Historia y Lore</h2>
                    <p>{enigma.lore}</p>
                </section>

                <section className="lore-section card-style">
                    <h2><span className="accent-bullet">#</span> ¿Cómo se resolvió?</h2>
                    <p>{enigma.resolution}</p>
                </section>

                <section className="lore-section card-style interactive-section">
                    <h2><span className="accent-bullet">#</span> Demo Interactiva: {enigma.toolTitle}</h2>
                    <p className="tool-description">{enigma.toolDesc}</p>

                    {enigma.interactiveComponent === "caesar" && (
                        <div className="tool-box">
                            <div className="form-group">
                                <label>Texto a Cifrar:</label>
                                <input
                                    type="text"
                                    value={caesarInput}
                                    onChange={(e) => setCaesarInput(e.target.value)}
                                    maxLength={40}
                                />
                            </div>
                            <div className="form-group">
                                <label>Desplazamiento (Shift): {caesarShift}</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="25"
                                    value={caesarShift}
                                    onChange={(e) => setCaesarShift(parseInt(e.target.value))}
                                />
                            </div>
                            <div className="result-box">
                                <span className="result-label">Resultado:</span>
                                <span className="result-text">{runCaesar(caesarInput, caesarShift)}</span>
                            </div>
                        </div>
                    )}

                    {enigma.interactiveComponent === "binary" && (
                        <div className="tool-box">
                            <div className="form-group">
                                <label>Escribe Texto:</label>
                                <input
                                    type="text"
                                    value={binaryInput}
                                    onChange={(e) => setBinaryInput(e.target.value)}
                                    maxLength={25}
                                />
                            </div>
                            <div className="result-box binary-box">
                                <span className="result-label">Código Binario:</span>
                                <span className="result-text">{stringToBinary(binaryInput)}</span>
                            </div>
                        </div>
                    )}

                    {enigma.interactiveComponent === "bouncing" && (
                        <div className="tool-box">
                            <button className="simulate-btn" onClick={toggleBouncing}>
                                {isBouncing ? "Detener Simulación" : "Iniciar Simulación"}
                            </button>
                            <div className="sandbox-screen">
                                {isBouncing ? (
                                    <div className="bouncing-animation-container">
                                        <div className="idiot-popup-box first">
                                            <div className="popup-title-bar">you_are_an_idiot.exe</div>
                                            <div className="popup-content-inner">
                                                <div className="smiley-face">☻</div>
                                                <p>YOU ARE AN IDIOT!</p>
                                            </div>
                                        </div>
                                        <div className="idiot-popup-box second">
                                            <div className="popup-title-bar">you_are_an_idiot.exe</div>
                                            <div className="popup-content-inner">
                                                <div className="smiley-face">☻</div>
                                                <p>YOU ARE AN IDIOT!</p>
                                            </div>
                                        </div>
                                        <div className="idiot-popup-box third">
                                            <div className="popup-title-bar">you_are_an_idiot.exe</div>
                                            <div className="popup-content-inner">
                                                <div className="smiley-face">☻</div>
                                                <p>YOU ARE AN IDIOT!</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="sandbox-placeholder">Haz clic en Iniciar Simulación para ver cómo parpadeaban y se multiplicaban las ventanas.</p>
                                )}
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Lore;
