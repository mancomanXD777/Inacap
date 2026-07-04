import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Terminal.css";

const OFFLINE_DB = {
    cicada: `EL PROYECTO DE CRIPTOGRAFÍA ████████ COMENZÓ SU RECLUTAMIENTO EL 5 DE ENERO DE 2012. UTILIZARON ESTEGANOGRAFÍA PARA OCULTAR MENSAJES EN IMÁGENES DE FOROS PÚBLICOS Y REQUIRIERON EL ANÁLISIS DE TEXTOS DE ████████, NUMEROLOGÍA MAYA Y MÚSICA CLÁSICA. A TRAVÉS DE FIRMAS PGP VERIFICADAS POR LA CLAVE DE SEGURIDAD 7A35090F, GUIARON A LOS PARTICIPANTES A COORDENADAS GEOGRÁFICAS EN EL MUNDO REAL EN BUSCA DE CARTELES CON CÓDIGOS QR. SE CREE QUE LOS INDIVIDUOS RECLUTADOS FUERON INTEGRADOS EN PROYECTOS DE ████████ Y DESARROLLO DE SOFTWARE DE PRIVACIDAD EN LA WEB OSCURA. EL ARCHIVO PERMANECE CLASIFICADO COMO: NO RESUELTO.`,
    crow: `EL PROTOTIPO EXPERIMENTAL 'CATASTROPHE CROW!', DISEÑADO PARA LA CONSOLA DE 64 BITS DE NINTENDO POR LA EXTINTA OPUS INTERACTIVE, FUE DESARROLLADO ENTRE 1998 Y 2000. SU CREADOR, MANFRED LORENZ, DESAPARECIÓ JUNTO CON LA COPIA MAESTRA TRAS EL COLAPSO FINANCIERO DEL ESTUDIO EN ████████. LOS REGISTROS DESCLASIFICADOS REVELAN MENSAJES OCULTOS EN BINARIO INCRUSTADOS EN LAS TRANSMISIONES DE VIDEO EN YOUTUBE, QUE DETALLAN UNA SIMULACIÓN MÉDICA FICTICIA Y NOTAS ASOCIADAS A LA PÉRDIDA DE SU HIJO. EL JUEGO CONTIENE CÓDIGO AUTOGENERADO QUE REACCIONA A LAS ACCIONES DEL JUGADOR, SIMULANDO UN ENTORNO CORRUPTO.`,
    idiot: `EL EXPLOIT WEB CONOCIDO ORIGINALMENTE COMO 'YOUAREANIDIOT.ORG' FUE CATALOGADO COMO UN VIRUS DE HOSTIGAMIENTO WEB A PARTIR DE 2002. EL CÓDIGO FUENTE UTILIZABA BUCLES DE SCRIPTING PARA SATURAR EL HILO PRINCIPAL DEL SISTEMA OPERATIVO MEDIANTE 'WINDOW.OPEN()', MULTIPLICANDO VENTANAS FLOTANTES QUE REBOTABAN POR LA PANTALLA EN COORDENADAS SENOIDALES. SE ESTIMA QUE INFECTÓ A MÁS DE ████████ DE COMPUTADORAS CORPORATIVAS Y ACADÉMICAS ANTES DE QUE LAS DIRECTIVAS DE SEGURIDAD DE NAVEGADORES WEB PARCHEARAN EL SOPORTE PARA LA DUPLICACIÓN ILIMITADA DE POPUPS.`,
    default: `ERROR 403: EXPEDIENTE NO DESCLASIFICADO O FUERA DEL ALCANCE DE TU NIVEL DE ACCESO.
POR FAVOR INGRESA CONSULTAS RELACIONADAS A:
- CICADA 3301
- CROW 64
- YOU ARE AN IDIOT

ESTA TERMINAL SE ENCUENTRA CONECTADA AL SATÉLITE ████████ PARA LA BÚSQUEDA DE MISTERIOS DE INTERNET.`
};

function Terminal() {
    const navigate = useNavigate();
    const [apiKey, setApiKey] = useState(localStorage.getItem("gemini_api_key") || "");
    const [query, setQuery] = useState("");
    const [loadingSteps, setLoadingSteps] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [history, setHistory] = useState([]);
    const bottomRef = useRef(null);

    // Scroll to bottom whenever history or loading steps change
    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [history, loadingSteps, isLoading]);

    const handleApiKeyChange = (e) => {
        const val = e.target.value;
        setApiKey(val);
        localStorage.setItem("gemini_api_key", val);
    };

    const getOfflineResponse = (q) => {
        const cleanQuery = q.toLowerCase();
        if (cleanQuery.includes("cicada") || cleanQuery.includes("3301") || cleanQuery.includes("polilla")) {
            return {
                caseName: "CICADA 3301",
                status: "UNSOLVED",
                threat: "███████░░░",
                summary: OFFLINE_DB.cicada
            };
        } else if (cleanQuery.includes("crow") || cleanQuery.includes("cuervo") || cleanQuery.includes("catastrophe")) {
            return {
                caseName: "CROW 64",
                status: "CLASSIFIED",
                threat: "██████░░░░",
                summary: OFFLINE_DB.crow
            };
        } else if (cleanQuery.includes("idiot") || cleanQuery.includes("caras") || cleanQuery.includes("exploit") || cleanQuery.includes("virus")) {
            return {
                caseName: "YOU ARE AN IDIOT",
                status: "RESOLVED",
                threat: "████░░░░░░",
                summary: OFFLINE_DB.idiot
            };
        } else {
            return {
                caseName: "DESCONOCIDO",
                status: "CLASSIFIED",
                threat: "████████░░",
                summary: OFFLINE_DB.default
            };
        }
    };

    const queryGemini = async (userQuery) => {
        const currentKey = apiKey.trim() || import.meta.env.VITE_GEMINI_API_KEY || "";
        if (!currentKey) {
            // Wait 1 second to simulate local lookup
            await new Promise((r) => setTimeout(r, 1000));
            return getOfflineResponse(userQuery);
        }

        try {
            const systemPrompt = `Eres una terminal de base de datos de archivos clasificados de la inteligencia militar e internet. Tu tarea es responder a la pregunta del usuario en formato de expediente clasificado. Para las preguntas que no sean de misterios de internet, dile al usuario que la consulta excede sus privilegios de seguridad o no pertenece a la base de datos de misterios.
IMPORTANTE: Escribe tu respuesta final en un lenguaje frío, objetivo y confidencial. Ocasionalmente, reemplaza nombres, fechas clave u organizaciones secretas con bloques negros '████████' para darle misterio al expediente.
Tu respuesta debe constar SOLAMENTE de la sección SUMMARY del informe. No escribas el resto de campos (CASE FILE, CLASSIFICATION, etc.), ya que la terminal del frontend los generará automáticamente.
Ejemplo de salida de tu SUMMARY:
El proyecto conocido como Cicada 3301 inició operaciones el ████████. A través de acertijos criptográficos de alta complejidad, buscaron reclutar mentes brillantes para ████████. Hasta la fecha, el paradero de sus creadores es ████████.`;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${currentKey}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: userQuery }] }],
                        systemInstruction: {
                            parts: [{ text: systemPrompt }]
                        }
                    })
                }
            );

            const data = await response.json();
            if (data.candidates && data.candidates[0].content.parts[0].text) {
                const text = data.candidates[0].content.parts[0].text.trim();
                
                // Determine case name based on query
                const lowerQ = userQuery.toLowerCase();
                let caseName = "CONSULTA EXTERNA";
                let status = "CLASSIFIED";
                let threat = "██████░░░░";

                if (lowerQ.includes("cicada") || lowerQ.includes("3301")) {
                    caseName = "CICADA 3301";
                    status = "UNSOLVED";
                    threat = "███████░░░";
                } else if (lowerQ.includes("crow")) {
                    caseName = "CROW 64";
                    status = "CLASSIFIED";
                    threat = "██████░░░░";
                } else if (lowerQ.includes("idiot")) {
                    caseName = "YOU ARE AN IDIOT";
                    status = "RESOLVED";
                    threat = "████░░░░░░";
                }

                return {
                    caseName,
                    status,
                    threat,
                    summary: text
                };
            } else {
                throw new Error("Formato de API inválido");
            }
        } catch (err) {
            console.error(err);
            // Fallback
            return {
                caseName: "ERROR CONEXIÓN",
                status: "LOCAL_BACKUP",
                threat: "████████░░",
                summary: `[AVISO: ERROR EN SATÉLITE GEMINI - ACCEDIENDO A ARCHIVOS LOCALES]\n\n` + getOfflineResponse(userQuery).summary
            };
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim() || isLoading) return;

        const currentQuery = query;
        setQuery("");
        setIsLoading(true);
        setLoadingSteps([]);

        // Simulated steps:
        const steps = [
            "Initializing connection...",
            "Accessing archive...",
            "Searching classified files...",
            "████████████████ 100%",
            "Opening document..."
        ];

        for (let i = 0; i < steps.length; i++) {
            setLoadingSteps((prev) => [...prev, steps[i]]);
            await new Promise((r) => setTimeout(r, 600));
        }

        // Query AI or local db
        const result = await queryGemini(currentQuery);

        setHistory((prev) => [
            ...prev,
            {
                query: currentQuery,
                caseName: result.caseName,
                status: result.status,
                threat: result.threat,
                summary: result.summary,
                timestamp: new Date().toLocaleTimeString()
            }
        ]);

        setIsLoading(false);
        setLoadingSteps([]);
    };

    return (
        <div className="terminal-page-container">
            {/* Scanline and noise effect overlay */}
            <div className="scanlines"></div>
            <div className="noise"></div>

            {/* Top Bar / Nav */}
            <div className="terminal-nav">
                <button className="term-back-btn" onClick={() => navigate("/home")}>
                    &lt; VOLVER AL PORTAL PRINCIPAL
                </button>
                <div className="term-key-wrapper">
                    <label>CLAVE DE ACCESO GEMINI:</label>
                    <input
                        type="password"
                        placeholder="Offline (Base Datos Local)"
                        value={apiKey}
                        onChange={handleApiKeyChange}
                    />
                </div>
            </div>

            {/* Terminal Main Grid */}
            <div className="terminal-wrapper">
                {/* Terminal Header */}
                <header className="terminal-header">
                    <pre className="term-ascii-logo">
████ INTERNET MYSTERIES ARCHIVE ████
ARCHIVE AI TERMINAL
STATUS: ONLINE
ACCESS LEVEL: AUTHORIZED
DATABASE: CONNECTED
                    </pre>
                </header>

                {/* History of cases */}
                <div className="terminal-history">
                    {history.map((h, index) => (
                        <div key={index} className="case-file-card">
                            <div className="card-top-decoration">══════════════════════════════</div>
                            <div className="case-header-field">
                                <span className="field-title">CASE FILE</span>
                            </div>
                            <div className="case-field">
                                <span className="field-title">CASE:</span>
                                <span className="field-value green-glow">{h.caseName}</span>
                            </div>
                            <div className="case-field">
                                <span className="field-title">STATUS:</span>
                                <span className="field-value">{h.status}</span>
                            </div>
                            <div className="case-field">
                                <span className="field-title">CLASSIFICATION:</span>
                                <span className="field-value red-text">TOP SECRET</span>
                            </div>
                            <div className="case-field">
                                <span className="field-title">THREAT LEVEL:</span>
                                <span className="field-value">{h.threat}</span>
                            </div>
                            <div className="case-divider">------------------------------</div>
                            <div className="case-summary-box">
                                <span className="field-title">SUMMARY:</span>
                                <p className="case-summary-text">
                                    <TypewriterText text={h.summary} />
                                </p>
                            </div>
                            <div className="case-divider">------------------------------</div>
                            <div className="case-field">
                                <span className="field-title">SOURCE STATUS:</span>
                                <span className="field-value">VERIFIED</span>
                            </div>
                            <div className="case-field">
                                <span className="field-title">LAST UPDATE:</span>
                                <span className="field-value">AUTO GENERATED</span>
                            </div>
                            <div className="card-bottom-decoration">══════════════════════════════</div>
                        </div>
                    ))}

                    {/* Loading Animation */}
                    {isLoading && (
                        <div className="terminal-loading-box">
                            {loadingSteps.map((step, i) => (
                                <p key={i} className="loading-step-line">&gt; {step}</p>
                            ))}
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                {/* Command Line Input */}
                <form className="terminal-command-line" onSubmit={handleFormSubmit}>
                    <span className="term-prompt">&gt;</span>
                    <input
                        type="text"
                        className="term-input"
                        placeholder="Escribe una pregunta para consultar la base de datos de misterios..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isLoading}
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
}

// Sub-component for Typewriter Text effect
function TypewriterText({ text, delay = 10 }) {
    const [currentText, setCurrentText] = useState("");

    useEffect(() => {
        let index = 0;
        setCurrentText("");
        const timer = setInterval(() => {
            setCurrentText((prev) => prev + text.charAt(index));
            index++;
            if (index >= text.length) {
                clearInterval(timer);
            }
        }, delay);
        return () => clearInterval(timer);
    }, [text, delay]);

    return <span>{currentText}</span>;
}

export default Terminal;
