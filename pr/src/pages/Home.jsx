import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../Home.css";

const CAROUSEL_ITEMS = [
    {
        id: "cicada3301",
        title: "Cicada 3301",
        description: "El enigma criptográfico más complejo de la red. Haz clic para ver su historia.",
        image: "/cicada3301.jpg"
    },
    {
        id: "crow64",
        title: "Crow 64",
        description: "El juego maldito de Nintendo 64 que nunca existió. Haz clic para ver su historia.",
        image: "/crow64.jpg"
    },
    {
        id: "youareanidiot",
        title: "youareanidiot",
        description: "El exploit del navegador que aterrorizó a los usuarios. Haz clic para ver su historia.",
        image: "/youareanidiot.jpg"
    }
];

function Home() {
    const navigate = useNavigate();
    const usuario = localStorage.getItem("usuarioActivo");

    // Security check: Redirect to login if session not created
    useEffect(() => {
        if (!usuario) {
            navigate("/login");
        }
    }, [usuario, navigate]);

    // Carousel States
    const [carouselIndex, setCarouselIndex] = useState(0);

    // Auto-slide effect for carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_ITEMS.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    // Comments CRUD States
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");

    // Contact Modal States
    const [mostrarContacto, setMostrarContacto] = useState(false);
    const [contactName, setContactName] = useState("");
    const [contactSituation, setContactSituation] = useState("");
    const [contactSuccess, setContactSuccess] = useState(false);

    // Load comments on mount
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("comentarios")) || [];
        setComentarios(stored);
    }, []);

    // Handle add comment
    const agregarComentario = (e) => {
        e.preventDefault();
        if (!nuevoComentario.trim()) return;

        const nuevo = {
            id: Date.now(),
            texto: nuevoComentario.trim(),
            autor: usuario || "Anónimo"
        };

        const listado = [nuevo, ...comentarios];
        setComentarios(listado);
        localStorage.setItem("comentarios", JSON.stringify(listado));
        setNuevoComentario("");
    };

    // Handle delete comment
    const eliminarComentario = (id) => {
        const filtrados = comentarios.filter(c => c.id !== id);
        setComentarios(filtrados);
        localStorage.setItem("comentarios", JSON.stringify(filtrados));
    };

    // Handle contact form submission
    const enviarSituacion = (e) => {
        e.preventDefault();
        if (!contactName.trim() || !contactSituation.trim()) return;

        const nuevaSituacion = {
            id: Date.now(),
            nombre: contactName.trim(),
            situacion: contactSituation.trim()
        };

        const guardados = JSON.parse(localStorage.getItem("situacionesContacto")) || [];
        guardados.push(nuevaSituacion);
        localStorage.setItem("situacionesContacto", JSON.stringify(guardados));

        setContactName("");
        setContactSituation("");
        setContactSuccess(true);

        setTimeout(() => {
            setContactSuccess(false);
        }, 4000);
    };

    const cerrarSesion = () => {
        localStorage.removeItem("usuarioActivo");
        navigate("/");
    };

    const prevSlide = () => {
        setCarouselIndex((prev) => (prev === 0 ? CAROUSEL_ITEMS.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCarouselIndex((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    };

    return (
        <div className="home-dashboard-container">
            {/* Header / Navbar */}
            <nav className="dashboard-nav">
                <span className="logo-text" onClick={() => navigate("/")}>ENIGMAS</span>
                <div className="nav-controls">
                    <span className="welcome-msg">Agente: <strong className="user-glow">{usuario}</strong></span>
                    <button className="nav-btn terminal-trigger-btn" onClick={() => navigate("/terminal")}>
                        Terminal IA
                    </button>
                    <button className="nav-btn contact-trigger" onClick={() => setMostrarContacto(true)}>
                        Contacto
                    </button>
                    <button className="nav-btn logout-btn" onClick={cerrarSesion}>
                        Cerrar Sesión
                    </button>
                </div>
            </nav>

            {/* Hero / Banner */}
            <header className="home-header">
                <h1>Casos Archivados</h1>
                <p>Explora la base de datos confidencial. Haz clic en las imágenes del carrusel para descubrir el lore y las soluciones.</p>
            </header>

            {/* Carousel Section */}
            <section className="carousel-section">
                <div className="carousel-container">
                    <button className="carousel-arrow prev" onClick={prevSlide}>&#10094;</button>
                    
                    <div 
                        className="carousel-slide" 
                        onClick={() => navigate(`/lore/${CAROUSEL_ITEMS[carouselIndex].id}`)}
                        title="Haz clic para ver la historia"
                    >
                        <img 
                            src={CAROUSEL_ITEMS[carouselIndex].image} 
                            alt={CAROUSEL_ITEMS[carouselIndex].title} 
                            className="carousel-img"
                        />
                        <div className="carousel-info-overlay">
                            <h3>{CAROUSEL_ITEMS[carouselIndex].title}</h3>
                            <p>{CAROUSEL_ITEMS[carouselIndex].description}</p>
                            <span className="info-click-hint">Clic para ver Lore y Solución</span>
                        </div>
                    </div>

                    <button className="carousel-arrow next" onClick={nextSlide}>&#10095;</button>
                </div>

                <div className="carousel-indicators">
                    {CAROUSEL_ITEMS.map((item, idx) => (
                        <span 
                            key={item.id} 
                            className={`indicator-dot ${idx === carouselIndex ? 'active' : ''}`}
                            onClick={() => setCarouselIndex(idx)}
                        ></span>
                    ))}
                </div>
            </section>

            {/* Grid of Cards */}
            <section className="dashboard-grid-section">
                <h2>Todos los Enigmas</h2>
                <div className="cards">
                    <div className="card clickable-card" onClick={() => navigate("/lore/cicada3301")}>
                        <h3>Cicada3301</h3>
                        <p>El grupo secreto que solo reclutaba a los más listos (mundialmente).</p>
                        <span className="card-link-hint">Explorar →</span>
                    </div>

                    <div className="card clickable-card" onClick={() => navigate("/lore/crow64")}>
                        <h3>Crow 64</h3>
                        <p>El juego de Nintendo 64 que nunca existió.</p>
                        <span className="card-link-hint">Explorar →</span>
                    </div>

                    <div className="card clickable-card" onClick={() => navigate("/lore/youareanidiot")}>
                        <h3>youareanidiot</h3>
                        <p>El html más peligroso (anteriormente).</p>
                        <span className="card-link-hint">Explorar →</span>
                    </div>
                </div>
            </section>

            {/* Comments CRUD Section */}
            <section className="comments-section">
                <h2><span className="crimson-bullet">#</span> Foro de Investigación</h2>
                <p className="section-desc">Comparte pistas, teorías y hallazgos con otros agentes.</p>

                <form className="comment-form" onSubmit={agregarComentario}>
                    <textarea
                        placeholder="Escribe tu teoría o pista aquí..."
                        value={nuevoComentario}
                        onChange={(e) => setNuevoComentario(e.target.value)}
                        required
                        rows="3"
                    ></textarea>
                    <button type="submit" className="post-comment-btn">Publicar Pista</button>
                </form>

                <div className="comments-list">
                    {comentarios.length === 0 ? (
                        <p className="no-comments">No hay pistas registradas todavía. ¡Sé el primero!</p>
                    ) : (
                        comentarios.map((c) => (
                            <div className="comment-item" key={c.id}>
                                <div className="comment-header">
                                    <span className="comment-author">☻ Agente: <span className="author-name">{c.autor}</span></span>
                                    {c.autor === usuario && (
                                        <button className="delete-comment-btn" onClick={() => eliminarComentario(c.id)}>
                                            Eliminar
                                        </button>
                                    )}
                                </div>
                                <div className="comment-body">
                                    <p>{c.texto}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Contact Modal Window */}
            {mostrarContacto && (
                <div className="modal-backdrop">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h3>Canal de Contacto</h3>
                            <button className="close-modal-btn" onClick={() => setMostrarContacto(false)}>&times;</button>
                        </div>
                        
                        <div className="modal-body">
                            <div className="contact-details-box">
                                <p><strong>Nombre:</strong> Esteban Ibañez</p>
                                <p><strong>Teléfono:</strong> +56 9 6739 8924</p>
                                <p><strong>Correo:</strong> estebanibanezsaldias@gmail.com</p>
                            </div>

                            <div className="contact-divider"></div>

                            <form className="contact-form" onSubmit={enviarSituacion}>
                                <h4>Reportar Situación Especial</h4>
                                <p className="form-helper">Informa tu nombre y describe tu situación o reporte clasificado.</p>
                                
                                <div className="modal-form-group">
                                    <input 
                                        type="text" 
                                        placeholder="Tu Nombre" 
                                        value={contactName}
                                        onChange={(e) => setContactName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="modal-form-group">
                                    <textarea 
                                        placeholder="Describe tu situación..." 
                                        value={contactSituation}
                                        onChange={(e) => setContactSituation(e.target.value)}
                                        required
                                        rows="4"
                                    ></textarea>
                                </div>

                                <button type="submit" className="submit-situation-btn">
                                    Enviar Situación
                                </button>
                            </form>

                            {contactSuccess && (
                                <div className="success-banner">
                                    ¡Tu situación ha sido registrada por Esteban exitosamente!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <footer className="dashboard-footer">
               ©2026 Esteban Ibañez, TI3031, Inacap, Programación front end, Víctor Armando Vásquez Muñoz.
            </footer>
        </div>
    );
}

export default Home;