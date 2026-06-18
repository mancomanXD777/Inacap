
function Home() {

    const usuario =
        localStorage.getItem("usuarioActivo");

    return (
        <div>

            <h1>Enigmas</h1>

            <h2>Bienvenido {usuario}</h2>

            <p>
                Hay secretos enterrados en la oscuridad...
            </p>

            <h3>Casos Sin Resolver</h3>

            <ul>
                <li>Cicada3301</li>
                <li>Crow 64</li>
                <li>youareanidiot</li>
            </ul>

        </div>
    );
}

export default Home;