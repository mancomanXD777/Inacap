import React from "react";
import { Link } from "react-router-dom";

export default function contacto() {
  return (
    <div>
      <h1>Contacto</h1>
      <form>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />
        <button type="submit">Enviar</button>
        <p>Esta es la pagina de contacto.</p>
        <Link to="/">Ir a Inicio</Link>
      </form>   
    </div>
  );
}