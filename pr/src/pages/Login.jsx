import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
function Login() {

    const [modoRegistro, setModoRegistro] = useState(false);
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");

    const navigate = useNavigate();

    const manejarSubmit = (e) => {

        e.preventDefault();

        let usuarios =
            JSON.parse(localStorage.getItem("usuarios")) || [];

        if (modoRegistro) {

            const existe = usuarios.find(
                u => u.usuario === usuario
            );

            if (existe) {
                setMensaje("Ese usuario ya existe.");
                return;
            }

            usuarios.push({
                usuario,
                password
            });

            localStorage.setItem(
                "usuarios",
                JSON.stringify(usuarios)
            );

            setMensaje("Cuenta creada correctamente.");
            setModoRegistro(false);

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
        <div>

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
                />

                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <button>
                    {
                        modoRegistro
                        ? "Crear cuenta"
                        : "Iniciar sesión"
                    }
                </button>

            </form>

            <p>{mensaje}</p>

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

        </div>
    );
}

export default Login;