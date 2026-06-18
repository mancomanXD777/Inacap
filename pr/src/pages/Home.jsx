import { useNavigate } from "react-router-dom";
import "../Home.css";
import { useState } from "react";

function Home() {
    const navigate = useNavigate();
    const usuario = localStorage.getItem("usuarioActivo");

    const [mostrarMensaje, setMostrarMensaje] = useState(false);

    return (
        <>
            <header>
                <h1>Enigmas</h1>

                <p>
                    Hay secretos enterrados en la oscuridad...
                    Algunos jamás debieron ser descubiertos.
                </p>

                <button onClick={() => navigate("/")}>
                    Descubrir los secretos
                </button>
            </header>

            <section>
                <h2>
                    Bienvenido {usuario}
                </h2>

                <h2>Casos Sin Resolver</h2>

                <div className="cards">

                    <div className="card">
                        <h3>Cicada3301</h3>
                        <p>
                            El grupo secreto que solo reclutaba
                            a los más listos (mundialmente).
                        </p>
                    </div>

                    <div className="card">
                        <h3>Crow 64</h3>
                        <p>
                            El juego de Nintendo 64 que nunca existió.
                        </p>
                    </div>

                    <div className="card">
                        <h3>youareanidiot</h3>
                        <p>
                            El html más peligroso (anteriormente).
                        </p>
                    </div>

                </div>

                <div
                    className={
                        mostrarMensaje
                            ? "hidden-message show"
                            : "hidden-message"
                    }
                >
                    "No estás solo... alguien te observa desde la oscuridad."
                </div>

            </section>

            <footer>
                © 2026 Misterio Oscuro | Todos los secretos reservados
            </footer>
        </>
    );
}

export default Home;