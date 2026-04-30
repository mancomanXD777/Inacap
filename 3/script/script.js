function entrar() 
{   import (registrar)


    var u = document.getElementById("usuarioInput").value;
    var c = document.getElementById("claveInput").value;
    var errorDiv = document.getElementById("mensajeError");

    errorDiv.innerHTML = "";

    if (u.includes("@") && c === "Tokyo") {
        errorDiv.innerHTML = "Todo Correcto";
    } 
    else if (!u.includes("@") && c === "Tokyo") {
        errorDiv.innerHTML = "Error: No Contiene El @.";
    } 
    else if (u.includes("@") && c !== "Tokyo") {
        errorDiv.innerHTML = "Error: Clave Incorrecta.";
    } 
    else {
        errorDiv.innerHTML = "Datos no concordantes. Intente de nuevo.";
    }
}
