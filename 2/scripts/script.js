function entrar() {
    var u = document.getElementById("usuarioInput").value;
    var c = document.getElementById("claveInput").value;
    var errorDiv = document.getElementById("mensajeError");

    errorDiv.innerHTML = "";

    if (u === "esñtp" && c === "Tokyo") {
        window.location.href = "index3.html";
    } 
    else if (u !== "esñtp" && c === "Tokyo") {
        errorDiv.innerHTML = "Error: Tradúzcala al español donde se agrega la Ñ.";
    } 
    else if (u === "esñtp" && c !== "Tokyo") {
        errorDiv.innerHTML = "Error: Traduce el código de forma correcta.";
    } 
    else {
        errorDiv.innerHTML = "Datos no concordantes. Intente de nuevo.";
    }
}
