function entrar() {
var u = document.getElementById("usuarioInput").value;
var c = document.getElementById("claveInput").value;

if (u == "esñtp" && c == "Tokyo") {
    window.location.href = "index3.html";
} 
else if (u != "esñtp" && c == "Tokyo") {
    alert("traduzcala al español donde se agrega la Ñ");
} 
else if (u == "esñtp" && c != "Tokyo") {
    alert("traduce el codigo pedazo de animal");
} 
else {
    alert("datos no concordantes");
}
}