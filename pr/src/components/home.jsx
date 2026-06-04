import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a mi sitio web</h1>
      <p>Este es el contenido de la página de inicio.</p>
      <Link to="/contacto">Ir a Contacto</Link>
    </div>
  );
}