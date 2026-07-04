import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.css";
function Login() {

    const [modoRegistro, setModoRegistro] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [correo, setCorreo] = useState("");
    const [rut, setRut] = useState("");
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();

    const manejarSubmit = (e) => {

        e.preventDefault();

        let usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];

        if (modoRegistro) {

            if (!usuario.trim() || !password.trim() || !correo.trim() || !rut.trim()) {
                setMensaje("Todos los campos son obligatorios.");
                return;
            }

            if (!correo.includes("@") || !correo.includes(".")) {
                setMensaje("El correo debe contener '@' y '.'.");
                return;
            }

            const existe = usuarios.find(
                u => u.usuario === usuario
            );

            if (existe) {
                setMensaje("Ese usuario ya existe.");
                return;
            }

            usuarios.push({
                usuario,
                password,
                correo,
                rut
            });

            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );

            setMensaje("Cuenta creada correctamente.");
            setModoRegistro(false);
            setCorreo("");
            setRut("");

        } else {

            const usuarioValido = usuarios.find(
                u =>
                    u.usuario === usuario &&
                    u.password === password
            );

            if (usuarioValido) {

                localStorage.setItem(
                    "usuarioActivo",
                    usuario
                );

                navigate("/home");

            } else {
                setMensaje(
                    "Usuario o contraseña incorrectos."
                );
            }
        }
    };

    return (
        <div className="container">

            <h1>Enigmas</h1>

            <p>
                {
                    modoRegistro
                        ? "Crea una cuenta para entrar al misterio."
                        : "Inicia sesión para descubrir los secretos."
                }
            </p>

            <form onSubmit={manejarSubmit}>

                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e)=>setUsuario(e.target.value)}
                    required
                />

                {modoRegistro && (
                    <>
                        <input
                            type="text"
                            placeholder="Correo electrónico"
                            value={correo}
                            onChange={(e)=>setCorreo(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="RUT"
                            value={rut}
                            onChange={(e)=>setRut(e.target.value)}
                            required
                        />
                    </>
                )}

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                />

                <button>
                    {
                        modoRegistro
                        ? "Crear cuenta"
                        : "Iniciar sesión"
                    }
                </button>

            </form>

            <p className="message">
                {mensaje}
            </p>

            <button
                onClick={() =>
                    setModoRegistro(!modoRegistro)
                }
            >
                {
                    modoRegistro
                    ? "¿Ya tienes cuenta?"
                    : "¿No tienes cuenta?"
                }
            </button>

            <div className="link">
                <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
                    ← Volver al Inicio
                </a>
            </div>

        </div>
    );
}

export default Login;